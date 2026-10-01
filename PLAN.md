# Harvey — Product & Engineering Plan

> A Harvey Specter–inspired training, style and conversation app.
> React + Vite, Apple-grade design language, fully offline (no API keys, no cost).

---

## 1. Product vision

Three pillars, one persona.

| Pillar | What it does | Why it exists |
| --- | --- | --- |
| **The Doctrine** (Mindset Training) | Long-form, chapter-based training on the mindset principles the Harvey Specter character embodies — with the psychology behind them, the toxic version to avoid, and real drills. | Depth. Not quote-porn — an actual curriculum. |
| **The Closet** (Wardrobe Analyzer) | You tell the app what you actually own. It builds outfits, scores them against menswear standards, and tells you exactly what to fix and what to buy next. | Turns taste into a measurable, explainable score. |
| **The Office** (Chatbot) | Talk to Harvey. Bring a situation, a negotiation, a fear, a half-formed idea. He pushes back, reframes, and gives you a directive. | Brainstorming partner with a spine. |

**Design north star:** Apple. Deep space-black canvas, frosted glass, large type with tight tracking, gold accent (whisky/cufflink gold), spring physics on interaction, generous whitespace, zero clutter.

---

## 2. Architecture

- **Framework:** React 19 + Vite 8 (already scaffolded).
- **Routing:** lightweight hash-based router (no extra dependency, works from `file://` and any static host).
- **State:** React context + `useLocalStorage` hook. Everything persists in the browser: chapter progress, closet contents, saved outfits, chat history.
- **No backend.** No network calls. No API keys. The chatbot is a deterministic rules + retrieval + composition engine written in JS.
- **Styling:** hand-written CSS with design tokens (`src/styles/tokens.css`). No Tailwind/UI kit — the look is bespoke.
- **Data:** all content lives in plain JS modules under `src/data/`, so it is easy to extend.

### Planned file structure

```
Harvey/
├── PLAN.md                      ← this document
├── TASKS.md                     ← live task board
├── README.md                    ← how to run + how to extend
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx                       app shell, router outlet
    ├── index.css                     global reset + primitives
    ├── styles/
    │   └── tokens.css                colour, type, motion, radius tokens
    ├── hooks/
    │   ├── useLocalStorage.js
    │   ├── useHashRoute.js
    │   └── useReveal.js              scroll-reveal via IntersectionObserver
    ├── components/                   design-system primitives
    │   ├── Button.jsx / .css
    │   ├── Card.jsx / .css
    │   ├── Segmented.jsx / .css
    │   ├── ScoreDial.jsx / .css
    │   ├── ProgressBar.jsx / .css
    │   ├── Sheet.jsx / .css          modal / bottom sheet
    │   ├── Chip.jsx / .css
    │   ├── Icon.jsx                  inline SVG set
    │   └── NavBar.jsx / .css         frosted top nav
    ├── features/
    │   ├── home/        Home.jsx     hero + three-pillar entry
    │   ├── mindset/
    │   │   ├── MindsetIndex.jsx      chapter grid + progress
    │   │   ├── ChapterReader.jsx     long-form reader
    │   │   └── mindset.css
    │   ├── wardrobe/
    │   │   ├── Closet.jsx            what you own
    │   │   ├── OutfitBuilder.jsx     assemble + live score
    │   │   ├── Verdict.jsx           score breakdown + fixes
    │   │   └── wardrobe.css
    │   └── chat/
    │       ├── Chat.jsx
    │       ├── MessageBubble.jsx
    │       └── chat.css
    ├── data/
    │   ├── chapters.js               mindset curriculum (long-form)
    │   ├── garments.js               garment catalog + attributes
    │   ├── styleRules.js             menswear scoring rules
    │   └── harveyBrain.js            persona knowledge base for chat
    └── engine/
        ├── outfitScore.js            wardrobe scoring engine
        ├── chatEngine.js             intent → response composition
        └── voice.js                  Harvey cadence / phrase assembly
```

---

## 3. Module specs

### 3.1 The Doctrine — Mindset Training

Each **chapter** is a rich object, not a paragraph:

```js
{
  id, number, title, subtitle, readMinutes, theme,
  hook,               // cold open — the scene/idea
  thesis,             // the principle in one hard sentence
  sections: [ { heading, body[], pullQuote? } ],   // in-depth teaching
  psychology,         // why it actually works (real research/theory)
  shadow,             // the toxic version — where this destroys people
  drills: [ { title, detail, cadence } ],          // do this, not just read
  scripts?: [ ... ],  // exact words for real situations
  selfCheck: [ ... ], // reflection prompts
  reading: [ { title, author, why } ]
}
```

Planned chapters (~10, each a genuine deep-dive):
1. Identity Before Outcome — confidence as a self-concept, not a mood
2. There Is Always Another Way — the option-generation habit
3. Leverage — what it is, how to build it, how to use it without burning the room
4. The Face You Wear — emotional regulation and non-reactivity
5. Prepared Beats Talented — information asymmetry as a weapon
6. Loyalty Is a Strategy — the compounding value of being someone's person
7. Reputation Is an Asset You Compound — personal brand mechanics
8. The Room — frame control, entrances, status signals
9. Standards — refusing mediocrity without becoming a tyrant
10. The Crack in the Armour — ego, therapy, failure, and why invulnerability fails

UI: chapter grid with progress rings → immersive reader (serif body, sticky progress rail, drill checkboxes that persist, "mark complete").

### 3.2 The Closet — Wardrobe Analyzer

**Taxonomy** — user adds items they own from a curated catalog, each carrying attributes the engine reads:

- `suit` — colour, pattern, pieces (2/3), lapel (notch/peak/shawl), fit, fabric, season
- `shirt` — colour, pattern, collar (spread/cutaway/point/button-down), cuff (french/barrel), fit
- `tie` — colour, pattern, material, width
- `shoes` — style (oxford/derby/loafer/monk), colour, toe (cap/plain/square), sole
- `pocketSquare`, `belt`, `watch`, `outerwear`, `accessories`

**Scoring engine** (`outfitScore.js`) — transparent, weighted, explainable. Every rule returns a delta plus a human sentence:

| Dimension | Weight | Checks |
| --- | --- | --- |
| Fit | 25 | fit tags on suit/shirt/trouser break |
| Formality coherence | 20 | all pieces sit at the same formality level |
| Colour harmony | 15 | suit/shirt/tie/shoe colour compatibility, shoe–belt match |
| Pattern discipline | 12 | scale contrast, max simultaneous patterns |
| Harvey signature | 15 | 3-piece, peak lapel, spread collar, French cuff, white linen square |
| Detail execution | 13 | tie width vs lapel, sock rule, watch, no-belt-with-vest, tie bar |

Output: 0–100 score, letter grade, a Harvey one-line verdict, ranked **fix list** (biggest gain first) and **next purchase** recommendation.

UI: closet shelves by category → outfit builder with live-updating score dial → verdict sheet with the breakdown bars and fixes.

### 3.3 The Office — Chatbot

Deterministic engine, no API. Pipeline:

```
input → normalise → intent classify → topic match (keyword + weight scoring)
      → mode modifier (Advice / Negotiate / Brainstorm / Tough Love / Style)
      → response plan (opener + core + evidence + directive + closer)
      → voice pass (cadence, sentence-length rhythm, rhetorical question, callback)
      → render (streamed word-by-word for feel)
```

- **Knowledge base** (`harveyBrain.js`): ~40 topic clusters — negotiation, salary, job loss, fear, procrastination, betrayal, leadership, imposter syndrome, breakups, presentations, style questions, "what do I wear to X", etc. Each has multiple angled responses so replies don't repeat.
- **Memory:** remembers your name, your stated problem, and earlier turns; makes callbacks.
- **Brainstorm mode:** generates options, pressure-tests them, forces you to pick one and name a deadline.
- All lines are **original** writing in the character's cadence — not copied dialogue.

UI: frosted chat surface, mode segmented control, suggested openers, typing indicator, persistent history, clear-chat.

---

## 4. Build phases

1. **Research** — mindset principles, menswear scoring criteria, voice patterns (background agent, in progress).
2. **Design system** — tokens, primitives, motion.
3. **Shell** — nav, router, layout, persistence.
4. **Doctrine** — content authoring, then reader UI.
5. **Closet** — taxonomy, engine, UI.
6. **Office** — brain, engine, UI.
7. **Polish & verify** — lint, build, dev-server smoke test, responsive pass, README.

## 5. Definition of done

- `npm run dev` serves an app where all three modules work end-to-end.
- `npm run build` passes clean; `npm run lint` clean.
- State survives a page reload.
- Works on desktop and mobile widths.
- No network dependency, no keys, no paid services.
