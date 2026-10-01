import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import useReveal from "../../hooks/useReveal";
import { readStored } from "../../hooks/useLocalStorage";
import "./home.css";

const PILLARS = [
  {
    route: "doctrine",
    icon: "brain",
    title: "The Doctrine",
    sub: "Mindset training",
    body: "Ten long-form chapters on the operating principles behind the character — what each one actually is, the psychology that makes it work, and the version of it that ruins people.",
    points: [
      "The thinking, then the research behind the thinking",
      "The shadow side of every principle, named out loud",
      "Drills and scripts you can use this week",
    ],
    cta: "Start reading",
  },
  {
    route: "closet",
    icon: "hanger",
    title: "The Closet",
    sub: "Wardrobe analyser",
    body: "Tell it what you own. It builds the outfit, scores it against real menswear standards across six weighted dimensions, and shows its working — every point, won or lost.",
    points: [
      "Fit, formality, colour, pattern, signature, details",
      "Ranked fixes: biggest gain first, not longest list",
      "One honest answer to what you should buy next",
    ],
    cta: "Open the closet",
  },
  {
    route: "office",
    icon: "chat",
    title: "The Office",
    sub: "Conversation",
    body: "Bring a real situation — a negotiation, a fear, a decision you keep re-opening. He pushes back, reframes it, and leaves you with something to actually do.",
    points: [
      "Five modes, from counsel to tough love",
      "Remembers your name and what you came in with",
      "Runs entirely on your machine. No account, no keys",
    ],
    cta: "Take a seat",
  },
];

function Pillar({ pillar, navigate, index }) {
  const [ref, shown] = useReveal({ threshold: 0.2 });
  return (
    <Card
      as="button"
      type="button"
      hover
      className={["home__pillar", shown && "is-shown"].filter(Boolean).join(" ")}
      style={{ transitionDelay: `${index * 90}ms` }}
      onClick={() => navigate(pillar.route)}
    >
      <span ref={ref} className="home__pillarIcon">
        <Icon name={pillar.icon} size={20} />
      </span>
      <h3 className="home__pillarTitle">{pillar.title}</h3>
      <p className="home__pillarSub">{pillar.sub}</p>
      <p className="home__pillarBody">{pillar.body}</p>
      <ul className="home__pillarList">
        {pillar.points.map((p) => (
          <li key={p}>
            <Icon name="check" size={14} />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <span className="home__pillarGo">
        {pillar.cta}
        <Icon name="arrow" size={16} />
      </span>
    </Card>
  );
}

export default function Home({ navigate }) {
  // The content modules are large and route-split, so the landing page pulls the
  // catalogue counts in asynchronously rather than dragging them into the
  // initial bundle. Progress itself comes straight from storage.
  const [totals, setTotals] = useState(null);
  const [progress] = useState(() => {
    const doctrine = readStored("doctrine", {});
    const closet = readStored("closet", []);
    const chat = readStored("chat", { messages: [] });
    return {
      chaptersDone: Object.values(doctrine || {}).filter((c) => c?.completed).length,
      garments: Array.isArray(closet) ? closet.length : 0,
      turns: Array.isArray(chat?.messages)
        ? chat.messages.filter((m) => m.role === "user").length
        : 0,
    };
  });

  useEffect(() => {
    let live = true;
    Promise.all([
      import("../../data/chapters"),
      import("../../data/harveyBrain"),
      import("../../data/garments"),
    ])
      .then(([chapterMod, brainMod, garmentMod]) => {
        if (!live) return;
        setTotals({
          chapters: chapterMod.chapters.length,
          topics: brainMod.topics.length,
          garments: garmentMod.catalog.length,
        });
      })
      .catch(() => {
        /* counts are decoration — the page is useful without them */
      });
    return () => {
      live = false;
    };
  }, []);

  const stats = [
    {
      num: totals ? `${progress.chaptersDone}/${totals.chapters}` : `${progress.chaptersDone}`,
      label: "Chapters completed",
    },
    { num: progress.garments, label: "Garments in your closet" },
    { num: progress.turns, label: "Conversations opened" },
    { num: totals ? totals.topics : "—", label: "Topics he can hold" },
  ];

  return (
    <div className="home">
      <header className="home__hero">
        <span className="home__glow" aria-hidden="true" />
        <span className="eyebrow">Mindset · Wardrobe · Counsel</span>
        <h1 className="home__title">
          Walk in as the
          <br />
          <em>verdict</em>, not the question.
        </h1>
        <p className="home__lede">
          A training studio built around one idea: presence is not a personality you are born with,
          it is a set of habits, standards and decisions you can actually practise. Read the
          doctrine. Fix the wardrobe. Then argue with someone who will not let you off easily.
        </p>
        <div className="home__actions">
          <Button variant="primary" size="lg" onClick={() => navigate("doctrine")}>
            Begin the doctrine
            <Icon name="arrow" size={17} />
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate("office")}>
            Talk it through
          </Button>
        </div>
        <p className="home__quote">
          &ldquo;Confidence is evidence, not a mood. Everything in here is about collecting the
          evidence.&rdquo;
        </p>
      </header>

      <section className="home__section">
        <div className="home__sectionHead">
          <h2>Three rooms.</h2>
          <span className="muted">Everything is stored on this device.</span>
        </div>
        <div className="grid grid--3">
          {PILLARS.map((pillar, i) => (
            <Pillar key={pillar.route} pillar={pillar} navigate={navigate} index={i} />
          ))}
        </div>

        <div className="home__stats">
          {stats.map((s) => (
            <div className="home__stat" key={s.label}>
              <span className="home__statNum">{s.num}</span>
              <span className="home__statLabel">{s.label}</span>
            </div>
          ))}
        </div>

        <p className="home__note">
          {totals
            ? `${totals.chapters} chapters, ${totals.garments} catalogued garments and ${totals.topics} conversation topics, all running locally in your browser.`
            : "The whole curriculum, catalogue and conversation engine run locally in your browser."}{" "}
          Nothing is uploaded, nothing is billed, and it works with the network off. This is an
          original, fan-made study aid inspired by the character — the writing here is our own.
        </p>
      </section>
    </div>
  );
}
