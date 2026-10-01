# Specter

A Harvey Specter–inspired training studio: long-form mindset doctrine, an explainable wardrobe
scoring engine, and a conversation partner that pushes back.

Built with React 19 + Vite. **No backend, no API keys, no network calls, no cost.** Everything —
the curriculum, the menswear rules, the chatbot — runs locally in the browser, and all of your
progress lives in `localStorage`.

> This is an original, fan-made study aid inspired by the character. All writing in the app is our
> own. It is not affiliated with *Suits* or its rights holders.

---

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
```

Other scripts:

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

Requires Node 20.19+ (Vite 8).

---

## The three pillars

| Route | Module | What it does |
| --- | --- | --- |
| `#/doctrine` | **The Doctrine** | Ten in-depth chapters. Each has a cold open, a thesis, teaching sections, the psychology behind the principle, its shadow side, drills, scripts, self-check prompts and further reading. Drill checkboxes and chapter completion persist. |
| `#/closet` | **The Closet** | You mark what you own from a catalogue of ~70 garments, build an outfit, and get a 0–100 score across six weighted dimensions with every point explained, a ranked fix list, and a next-purchase recommendation. |
| `#/office` | **The Office** | A deterministic chatbot. Classifies intent, scores topics, applies a mode modifier, composes a response and streams it word by word with human cadence. |

---

## Architecture

```
src/
├── main.jsx
├── App.jsx                    app shell, hash router, theme
├── index.css                  reset + global utilities
├── styles/tokens.css          colour, type, motion, radius tokens (+ light theme)
├── hooks/
│   ├── useLocalStorage.js     persistence (all keys prefixed `harvey:`)
│   ├── useHashRoute.js        dependency-free hash router
│   └── useReveal.js           IntersectionObserver scroll reveal
├── components/                design-system primitives
│   Button · Card · Chip · Segmented · ScoreDial · ProgressBar/Ring · Sheet · Icon · NavBar
├── features/
│   ├── home/                  landing hero + three pillar cards
│   ├── mindset/               MindsetIndex, ChapterReader
│   ├── wardrobe/              Wardrobe, Closet, OutfitBuilder, Verdict
│   └── chat/                  Chat, MessageBubble
├── data/                      all content lives here as plain JS
│   ├── chapters.js            the curriculum
│   ├── garments.js            garment catalogue, slots, contexts, colours
│   ├── styleRules.js          scoring weights, matrices, hard-fail table, copy
│   └── harveyBrain.js         topics, modes, openers, fallbacks, small talk
└── engine/
    ├── outfitScore.js         wardrobe scoring
    ├── chatEngine.js          intent → topic → response composition
    └── voice.js               cadence, streaming timings
```

**Routing** is hash-based (`#/doctrine/leverage`), so the build works from any static host and even
from `file://`. **State** is React-local plus `useLocalStorage`; there is no global store.

### Persisted keys

| Key | Shape |
| --- | --- |
| `harvey:theme` | `"dark" \| "light"` |
| `harvey:doctrine` | `{ [chapterId]: { completed: boolean, drills: { [index]: true } } }` |
| `harvey:closet` | `string[]` of garment ids |
| `harvey:outfit` | `{ items: { [slot]: itemId \| null }, fit: {...}, context: string }` |
| `harvey:chat` | `{ mode: string, messages: [{ id, role, blocks, topicId, label, at }] }` |

Clearing site data resets the app to a clean first run.

---

## How the wardrobe engine works

`engine/outfitScore.js` is deliberately transparent: **every rule returns a number *and* a sentence**,
so the UI can always answer "why did I lose those points?".

Six weighted dimensions, 100 points total:

| Dimension | Weight | Checks |
| --- | --- | --- |
| Fit | 25 | shoulder seam, shirt cuff exposure, trouser break, jacket collar, waist suppression, cut quality |
| Formality | 20 | coherence across pieces, fit for the occasion, suit/shirt/shoe formality, neckwear |
| Colour | 15 | shirt–suit contrast, shoe–suit matrix, belt–shoe match, tie separation |
| Pattern | 12 | how many patterns, scale contrast, total pattern weight |
| Signature | 15 | three-piece, peak lapel, shoulder line, spread collar, double cuff, white linen square, braces, dress watch |
| Details | 13 | tie width vs lapel, socks, metal consistency, tie bar, belt-or-braces, shoe condition, cufflinks |

On top of that sits a **hard-fail table** (`data/styleRules.js` → `HARD_FAILS`). Square-toe shoes, a
matching tie-and-square set, a collar gap, puddling trousers, polyester, white socks — each one caps
the total score no matter how good everything else is.

Outputs: `score`, `grade`, `band`, a one-line `verdict`, the full `dimensions` breakdown with every
check, a ranked `fixes` list (biggest recoverable gain first), and `hardFails`.

Two extras: `nextPurchase(closetIds, result)` walks a priority ladder to name the single best thing
to buy next, and `bestOutfit(closetIds, opts)` greedily searches your own closet for its highest-
scoring combination.

## How the chatbot works

No model, no network. `engine/chatEngine.js` runs a pipeline:

```
input → normalise → crisis check → small-talk check → topic scoring (keyword weights)
      → mode modifier → response plan (opener + core + directive + closer)
      → voice pass (cadence, timing) → streamed render
```

The session object returned by `createSession()` is mutable and tracks which responses have already
been used, the user's name, turn count and last topic — so replies do not repeat and can call back
to earlier turns. `crisis-support` is scored above every other topic and always breaks character to
point at real help.

---

## Extending it

**Add a chapter** — append an object to `src/data/chapters.js`:

```js
{
  id: "kebab-id", number: 11, title, subtitle, readMinutes, theme: "#hex",
  hook, thesis,
  sections: [{ heading, body: ["para", "para"], pullQuote }],
  psychology: { summary, points: [{ term, detail }] },
  shadow: { summary, signs: [], correction },
  drills: [{ title, detail, cadence }],
  scripts: [{ situation, say, why }],
  selfCheck: [],
  reading: [{ title, author, why }],
}
```

Nothing else needs touching — the index grid, reader, progress rings and routing all read from the
array.

**Add a garment** — append to `catalog` in `src/data/garments.js` with a `slot` from `SLOTS`, a
`colour` key from `COLOURS`, a `formality` (0–5) and the attributes for that slot (suits need
`pieces/lapel/lapelWidth/shoulder/fabric/fit/pattern/patternScale`; shoes need
`style/toe/sole/condition`; and so on). To change *how* it is judged, edit the matrices and weights
in `src/data/styleRules.js` — `DIMENSIONS`, `SHOE_SUIT_MATRIX`, `BELT_MATCH`, `HARD_FAILS`,
`PURCHASE_LADDER`. The engine reads all of them as data.

**Add a chat topic** — append to one of the `topicsA…F` arrays in `src/data/harveyBrain.js`:

```js
{
  id, label, keywords: ["multi word phrases score higher", "single"],
  weight: 1, intent: "advice",
  responses: [{ open, core: ["", ""], directive, followUp }],
}
```

Give a topic several responses with different angles — the engine avoids reusing one within a
session. Raise `weight` to make a topic win contested matches.

**Change the look** — everything visual is driven by `src/styles/tokens.css`, including the
`[data-theme="light"]` override. Change the accent in one place and the whole app follows.

---

## Notes

- `docs/RESEARCH.md` is the sourced reference document behind the curriculum, the menswear rules and
  the voice work.
- Accessibility: real buttons and inputs throughout, visible focus rings, `prefers-reduced-motion`
  honoured globally.
- Responsive from ~360px up.
