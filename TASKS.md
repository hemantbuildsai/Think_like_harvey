# Task Board

Legend: `[ ]` pending · `[~]` in progress · `[x]` done · `[!]` blocked

## Phase 0 — Setup
- [x] **setup** — Scaffold Vite + React 19, install deps, strip template files, create folder structure
- [x] **plan** — Write `PLAN.md` and `TASKS.md`

## Phase 1 — Research
- [x] **research** — Background research: Harvey mindset principles + psychology, menswear scoring criteria, voice/cadence patterns, further-reading list
  - depends on: —

## Phase 2 — Design system
- [x] **design-system** — Tokens (`styles/tokens.css`), global reset (`index.css`), motion + theme
- [x] **primitives** — `Button`, `Card`, `Chip`, `Segmented`, `ProgressBar`, `ScoreDial`, `Sheet`, `Icon`
  - depends on: design-system

## Phase 3 — App shell
- [x] **hooks** — `useLocalStorage`, `useHashRoute`, `useReveal`
- [x] **shell** — `App.jsx` layout, frosted `NavBar`, route switching, persistence context
  - depends on: primitives, hooks
- [x] **home** — Landing hero + three-pillar entry cards
  - depends on: shell

## Phase 4 — The Doctrine (Mindset)
- [x] **mindset-data** — Author ~10 in-depth chapters in `data/chapters.js` (hook, thesis, sections, psychology, shadow side, drills, scripts, self-check, reading)
  - depends on: research
- [x] **mindset-ui** — Chapter grid with progress rings + immersive `ChapterReader` (sticky progress rail, persistent drill checkboxes, mark-complete)
  - depends on: mindset-data, shell

## Phase 5 — The Closet (Wardrobe)
- [x] **wardrobe-data** — Garment taxonomy + catalog (`data/garments.js`) and rule table (`data/styleRules.js`)
  - depends on: research
- [x] **wardrobe-engine** — `engine/outfitScore.js`: weighted, explainable scoring across Fit / Formality / Colour / Pattern / Signature / Details → score, grade, verdict, ranked fixes, next purchase
  - depends on: wardrobe-data
- [x] **wardrobe-ui** — Closet shelves + outfit builder with live score dial + verdict sheet
  - depends on: wardrobe-engine, shell

## Phase 6 — The Office (Chatbot)
- [x] **chat-brain** — `data/harveyBrain.js`: ~40 topic clusters with multiple angled, original responses
  - depends on: research
- [x] **chat-engine** — `engine/chatEngine.js` + `engine/voice.js`: intent classification, topic scoring, mode modifiers, response composition, conversation memory
  - depends on: chat-brain
- [x] **chat-ui** — Chat surface, mode segmented control, suggested openers, streamed typing, persistent history
  - depends on: chat-engine, shell

## Phase 7 — Ship
- [x] **responsive** — Mobile / tablet pass on all three modules
- [x] **polish** — Empty states, transitions, keyboard access, reduced-motion
- [x] **verify** — `npm run lint`, `npm run build`, dev-server smoke test of every route
- [x] **readme** — `README.md`: run instructions, architecture, how to add chapters / garments / chat topics
  - depends on: everything above

---

## Status: shipped

All phases complete. Verified on 2026-08-20:

- `npm run lint` — clean
- `npm run build` — clean; route-split, 204 kB initial chunk (65 kB gzip), no size warnings
- `npm run dev` — serves; every route probed 200
- Render + interaction pass across all routes (home, doctrine index, two chapters,
  closet, office, unknown route): no React errors or warnings. Verified live that the
  chatbot matches a topic and streams a reply, the outfit engine scores and persists,
  drill/chapter progress persists, and the theme toggle round-trips.
- Wardrobe engine unit-checked: immaculate outfit 99 (A+), mid outfit 77 (B),
  deliberately broken outfit 48 (D) with 9 hard fails correctly detected and capping.
