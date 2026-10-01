import { useMemo, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Chip from "../../components/Chip";
import Icon from "../../components/Icon";
import { ProgressBar, ProgressRing } from "../../components/ProgressBar";
import Segmented from "../../components/Segmented";
import Sheet from "../../components/Sheet";
import chapters from "../../data/chapters";
import useLocalStorage from "../../hooks/useLocalStorage";
import useReveal from "../../hooks/useReveal";
import "./mindset.css";

const filters = [
  { value: "all", label: "All" },
  { value: "progress", label: "In progress" },
  { value: "done", label: "Completed" },
];

function chapterState(store, chapter) {
  const state = store?.[chapter.id] || {};
  const drills = state.drills || {};
  const checked = Object.values(drills).filter(Boolean).length;
  const total = chapter.drills?.length || 0;
  const percent = state.completed ? 100 : total ? Math.round((checked / total) * 100) : 0;
  return { completed: Boolean(state.completed), checked, total, percent };
}

function ChapterCard({ chapter, state, index, navigate }) {
  const [ref, shown] = useReveal({ threshold: 0.12, once: true });
  const headings = (chapter.sections || []).slice(0, 3).map((section) => section.heading);

  return (
    <Card
      as="button"
      type="button"
      pad="lg"
      hover
      glow={{ color: chapter.theme, top: "-48%", left: "54%" }}
      className={["mind-card", shown && "is-shown"].filter(Boolean).join(" ")}
      style={{ "--mind-theme": chapter.theme, "--mind-delay": `${index * 55}ms` }}
      onClick={() => navigate(`doctrine/${chapter.id}`)}
      ref={ref}
    >
      <span className="mind-card__num" aria-hidden="true">
        {String(chapter.number).padStart(2, "0")}
      </span>
      <div className="mind-card__top">
        <Chip swatch={chapter.theme}>{chapter.readMinutes} min</Chip>
        <span className="mind-ring" style={{ "--accent": chapter.theme }}>
          <ProgressRing value={state.percent} size={48} stroke={4} />
        </span>
      </div>
      <div className="mind-card__body">
        <h2>{chapter.title}</h2>
        <p>{chapter.subtitle}</p>
      </div>
      <div className="mind-card__chips" aria-label="Chapter sections">
        {headings.length ? (
          headings.map((heading) => <Chip key={heading}>{heading}</Chip>)
        ) : (
          <span className="mind-card__hook">{chapter.hook}</span>
        )}
      </div>
      <div className="mind-card__foot">
        <span>{state.checked} / {state.total} drills</span>
        <span className={state.completed ? "mind-done is-complete" : "mind-done"}>
          <Icon name="check" size={15} /> {state.completed ? "Completed" : `${state.percent}%`}
        </span>
      </div>
    </Card>
  );
}

export default function MindsetIndex({ navigate }) {
  const [doctrine, , resetDoctrine] = useLocalStorage("doctrine", {});
  const [filter, setFilter] = useState("all");
  const [resetOpen, setResetOpen] = useState(false);

  const stats = useMemo(() => {
    const chapterStats = chapters.map((chapter) => ({ chapter, state: chapterState(doctrine, chapter) }));
    const completed = chapterStats.filter(({ state }) => state.completed).length;
    const checked = chapterStats.reduce((sum, { state }) => sum + state.checked, 0);
    const totalDrills = chapterStats.reduce((sum, { state }) => sum + state.total, 0);
    const percent = chapters.length ? Math.round((completed / chapters.length) * 100) : 0;
    return { chapterStats, completed, checked, totalDrills, percent };
  }, [doctrine]);

  const visibleChapters = stats.chapterStats.filter(({ state }) => {
    if (filter === "done") return state.completed;
    if (filter === "progress") return !state.completed && state.percent > 0;
    return true;
  });

  return (
    <section className="page mind-index">
      <div className="shell">
        <header className="page__head mind-head">
          <span className="eyebrow">The Doctrine</span>
          <h1 className="page__title">A curriculum for operating under pressure.</h1>
          <p className="page__lede">
            Not quotes. Not cosplay. Ten field-tested mindset chapters that turn the Specter
            mythology into preparation, restraint, leverage, standards, and repeatable action.
          </p>
        </header>

        <Card pad="lg" accent className="mind-summary">
          <div className="mind-summary__ring" style={{ "--accent": "var(--accent)" }}>
            <ProgressRing value={stats.percent} size={92} stroke={7} />
            <strong>{stats.percent}%</strong>
          </div>
          <div className="mind-summary__main">
            <span className="eyebrow">Progress</span>
            <h2>{stats.completed} of {chapters.length} chapters complete</h2>
            <ProgressBar
              label="Doctrine completion"
              value={stats.completed}
              max={chapters.length}
              hint={`${stats.checked} of ${stats.totalDrills} drills checked`}
              colour="var(--accent)"
            />
          </div>
          <div className="mind-summary__actions">
            <Button variant="ghost" onClick={() => setResetOpen(true)}>
              <Icon name="trash" size={16} /> Reset progress
            </Button>
          </div>
        </Card>

        <div className="mind-toolbar">
          <Segmented options={filters} value={filter} onChange={setFilter} />
          <p className="muted">{visibleChapters.length} chapter{visibleChapters.length === 1 ? "" : "s"}</p>
        </div>

        <div className="grid grid--2 mind-grid">
          {visibleChapters.map(({ chapter, state }, index) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              state={state}
              index={index}
              navigate={navigate}
            />
          ))}
        </div>
      </div>

      <Sheet
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Reset Doctrine progress?"
        subtitle="This clears completed chapters and every checked drill from local storage."
        width="min(460px, calc(100vw - 32px))"
      >
        <div className="mind-reset">
          <p className="muted">Your curriculum content stays intact. Only the saved progress object is cleared.</p>
          <div className="mind-reset__actions">
            <Button variant="ghost" onClick={() => setResetOpen(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={() => {
                resetDoctrine();
                setResetOpen(false);
              }}
            >
              Reset progress
            </Button>
          </div>
        </div>
      </Sheet>
    </section>
  );
}
