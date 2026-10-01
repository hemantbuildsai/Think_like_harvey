import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Chip from "../../components/Chip";
import Icon from "../../components/Icon";
import { ProgressBar } from "../../components/ProgressBar";
import chapters from "../../data/chapters";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./mindset.css";

function getChapterState(store, id, drillCount) {
  const state = store?.[id] || {};
  const drills = state.drills || {};
  const checked = Object.values(drills).filter(Boolean).length;
  const percent = state.completed ? 100 : drillCount ? Math.round((checked / drillCount) * 100) : 0;
  return { completed: Boolean(state.completed), drills, checked, percent };
}

function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  return new Promise((resolve, reject) => {
    try {
      const node = document.createElement("textarea");
      node.value = text;
      node.setAttribute("readonly", "");
      node.style.position = "fixed";
      node.style.inset = "0 auto auto 0";
      node.style.opacity = "0";
      document.body.appendChild(node);
      node.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(node);
      if (ok) resolve();
      else reject(new Error("Copy unavailable"));
    } catch (error) {
      reject(error);
    }
  });
}

export default function ChapterReader({ id, navigate }) {
  const chapter = chapters.find((item) => item.id === id);
  const [doctrine, setDoctrine] = useLocalStorage("doctrine", {});
  const [scroll, setScroll] = useState(0);
  const [active, setActive] = useState("hook");
  const [copied, setCopied] = useState(null);
  const sectionRefs = useRef({});

  const chapterIndex = chapter ? chapters.findIndex((item) => item.id === chapter.id) : -1;
  const prev = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
  const next = chapterIndex >= 0 && chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;
  const drillCount = chapter?.drills?.length || 0;
  const progress = getChapterState(doctrine, id, drillCount);

  const navItems = useMemo(() => {
    if (!chapter) return [];
    return [
      { id: "hook", label: "Opening" },
      { id: "thesis", label: "Thesis" },
      ...(chapter.sections || []).map((section, index) => ({ id: `section-${index}`, label: section.heading })),
      { id: "psychology", label: "Psychology" },
      { id: "shadow", label: "Shadow" },
      { id: "drills", label: "Drills" },
      ...(chapter.scripts?.length ? [{ id: "scripts", label: "Scripts" }] : []),
      { id: "self-check", label: "Self-check" },
      { id: "reading", label: "Reading" },
    ];
  }, [chapter]);

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      setScroll(max > 0 ? Math.min(100, Math.max(0, (root.scrollTop / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [id]);

  useEffect(() => {
    if (!navItems.length || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -66% 0px", threshold: [0.05, 0.2, 0.45] },
    );
    navItems.forEach((item) => {
      const node = sectionRefs.current[item.id];
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    if (copied === null) return undefined;
    const timer = window.setTimeout(() => setCopied(null), 1400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  if (!chapter) {
    return (
      <section className="page mind-reader">
        <div className="shell">
          <Card pad="lg" className="mind-notfound">
            <span className="eyebrow">The Doctrine</span>
            <h1>Chapter not found.</h1>
            <p className="muted">That doctrine file does not exist. Return to the index and choose a chapter.</p>
            <Button variant="primary" onClick={() => navigate("doctrine")}>
              <Icon name="back" size={17} /> Back to Doctrine
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  const updateChapter = (updater) => {
    setDoctrine((current = {}) => {
      const existing = current[chapter.id] || {};
      return { ...current, [chapter.id]: updater(existing) };
    });
  };

  const toggleDrill = (index) => {
    updateChapter((existing) => {
      const drills = { ...(existing.drills || {}) };
      if (drills[index]) delete drills[index];
      else drills[index] = true;
      return { ...existing, drills };
    });
  };

  const toggleComplete = () => {
    updateChapter((existing) => ({ ...existing, completed: !existing.completed, drills: existing.drills || {} }));
  };

  const jumpTo = (target) => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    sectionRefs.current[target]?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <section className="page mind-reader" style={{ "--mind-theme": chapter.theme }}>
      <div className="mind-scroll" aria-hidden="true">
        <span style={{ width: `${scroll}%` }} />
      </div>

      <div className="shell">
        <Button variant="ghost" className="mind-back" onClick={() => navigate("doctrine")}>
          <Icon name="back" size={17} /> Doctrine
        </Button>

        <header className="mind-hero">
          <span className="mind-hero__glow" aria-hidden="true" />
          <div className="mind-hero__meta">
            <Chip swatch={chapter.theme}>Chapter {chapter.number}</Chip>
            <Chip>{chapter.readMinutes} min read</Chip>
            <Chip tone={progress.completed ? "good" : ""}>{progress.completed ? "Complete" : `${progress.percent}%`}</Chip>
          </div>
          <h1>{chapter.title}</h1>
          <p>{chapter.subtitle}</p>
        </header>

        <div className="mind-layout">
          <main className="mind-article">
            <section
              id="hook"
              ref={(node) => { sectionRefs.current.hook = node; }}
              className="mind-block mind-hook"
            >
              <p>{chapter.hook}</p>
            </section>

            <hr className="divider" />

            <section
              id="thesis"
              ref={(node) => { sectionRefs.current.thesis = node; }}
              className="mind-block mind-thesis"
            >
              <span className="eyebrow">Thesis</span>
              <p>{chapter.thesis}</p>
            </section>

            {(chapter.sections || []).map((section, index) => (
              <section
                key={section.heading}
                id={`section-${index}`}
                ref={(node) => { sectionRefs.current[`section-${index}`] = node; }}
                className="mind-block mind-section"
              >
                <h2>{section.heading}</h2>
                {(section.body || []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.pullQuote ? <blockquote>{section.pullQuote}</blockquote> : null}
              </section>
            ))}

            <Card
              as="section"
              pad="lg"
              id="psychology"
              className="mind-panel"
              ref={(node) => { sectionRefs.current.psychology = node; }}
            >
              <span className="eyebrow">Psychology</span>
              <p>{chapter.psychology?.summary}</p>
              <div className="mind-terms">
                {(chapter.psychology?.points || []).map((point) => (
                  <div className="mind-term" key={point.term}>
                    <strong>{point.term}</strong>
                    <span>{point.detail}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card
              as="section"
              pad="lg"
              id="shadow"
              className="mind-panel mind-panel--shadow"
              ref={(node) => { sectionRefs.current.shadow = node; }}
            >
              <span className="eyebrow">Shadow side</span>
              <p>{chapter.shadow?.summary}</p>
              <ul>
                {(chapter.shadow?.signs || []).map((sign) => <li key={sign}>{sign}</li>)}
              </ul>
              <div className="mind-correction">
                <strong>Correction</strong>
                <span>{chapter.shadow?.correction}</span>
              </div>
            </Card>

            <Card
              as="section"
              pad="lg"
              id="drills"
              className="mind-panel"
              ref={(node) => { sectionRefs.current.drills = node; }}
            >
              <div className="mind-panel__head">
                <div>
                  <span className="eyebrow">Drills</span>
                  <h2>{progress.checked} of {drillCount} done</h2>
                </div>
                <ProgressBar value={progress.checked} max={drillCount || 1} hint={`${progress.percent}%`} colour={chapter.theme} />
              </div>
              <div className="mind-drills">
                {(chapter.drills || []).map((drill, index) => (
                  <label className="mind-drill" key={drill.title}>
                    <input
                      type="checkbox"
                      checked={Boolean(progress.drills[index])}
                      onChange={() => toggleDrill(index)}
                    />
                    <span className="mind-drill__box" aria-hidden="true"><Icon name="check" size={15} /></span>
                    <span className="mind-drill__body">
                      <span><strong>{drill.title}</strong><Chip>{drill.cadence}</Chip></span>
                      <em>{drill.detail}</em>
                    </span>
                  </label>
                ))}
              </div>
            </Card>

            {chapter.scripts?.length ? (
              <section
                id="scripts"
                ref={(node) => { sectionRefs.current.scripts = node; }}
                className="mind-block mind-scripts"
              >
                <span className="eyebrow">Scripts</span>
                <h2>Lines for pressure moments</h2>
                {chapter.scripts.map((script, index) => (
                  <Card as="article" pad="md" className="mind-script" key={script.situation}>
                    <div className="mind-script__head">
                      <strong>{script.situation}</strong>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          copyText(script.say)
                            .then(() => setCopied(index))
                            .catch(() => setCopied(`failed-${index}`));
                        }}
                      >
                        <Icon name="plus" size={14} /> {copied === index ? "Copied" : copied === `failed-${index}` ? "Copy failed" : "Copy"}
                      </Button>
                    </div>
                    <blockquote>“{script.say}”</blockquote>
                    <p className="muted">{script.why}</p>
                  </Card>
                ))}
              </section>
            ) : null}

            <Card
              as="section"
              pad="lg"
              id="self-check"
              className="mind-panel"
              ref={(node) => { sectionRefs.current["self-check"] = node; }}
            >
              <span className="eyebrow">Self-check</span>
              <ol className="mind-list">
                {(chapter.selfCheck || []).map((prompt) => <li key={prompt}>{prompt}</li>)}
              </ol>
            </Card>

            <Card
              as="section"
              pad="lg"
              id="reading"
              className="mind-panel"
              ref={(node) => { sectionRefs.current.reading = node; }}
            >
              <span className="eyebrow">Reading</span>
              <div className="mind-reading">
                {(chapter.reading || []).map((book) => (
                  <article key={`${book.title}-${book.author}`}>
                    <h3>{book.title}</h3>
                    <span>{book.author}</span>
                    <p>{book.why}</p>
                  </article>
                ))}
              </div>
            </Card>

            <footer className="mind-bottom">
              <Button variant={progress.completed ? "outline" : "primary"} size="lg" onClick={toggleComplete}>
                <Icon name="check" size={18} /> {progress.completed ? "Marked complete" : "Mark chapter complete"}
              </Button>
              <div className="mind-bottom__nav">
                <Button variant="ghost" disabled={!prev} onClick={() => prev && navigate(`doctrine/${prev.id}`)}>
                  <Icon name="back" size={16} /> {prev ? prev.title : "No previous"}
                </Button>
                <Button variant="ghost" disabled={!next} onClick={() => next && navigate(`doctrine/${next.id}`)}>
                  {next ? next.title : "No next"} <Icon name="arrow" size={16} />
                </Button>
              </div>
            </footer>
          </main>

          <aside className="mind-rail" aria-label="Chapter sections">
            <span className="eyebrow">In this chapter</span>
            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                className={active === item.id ? "is-active" : ""}
                onClick={() => jumpTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
