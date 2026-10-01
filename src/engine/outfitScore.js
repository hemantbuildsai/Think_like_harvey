// Outfit scoring engine.
//
// Transparent and explainable by design: every rule contributes a numeric delta
// AND a sentence, so the UI can always answer "why did I lose those points?".
//
// Shape of the input:
//   { items: { suit, shirt, tie, shoes, pocketSquare, waist, watch, cufflinks,
//              tieBar, socks },   // values are catalog ids or null
//     fit:   { shoulder, cuff, break, collar, waist },  // 0 | 1 | 2
//     context: "boardroom" | "court" | ... }

import { getItem, catalog, CONTEXTS } from "../data/garments.js";
import {
  DIMENSIONS,
  FIT_CHECKS,
  DEFAULT_FIT,
  SUIT_FIT_QUALITY,
  SHIRT_COLOUR_SCORE,
  SUIT_COLOUR_SCORE,
  SHOE_SUIT_MATRIX,
  BELT_MATCH,
  SHOE_STYLE_SCORE,
  COLLAR_SCORE,
  CUFF_SCORE,
  POCKET_SQUARE_SCORE,
  PATTERN_WEIGHT,
  HARD_FAILS,
  GRADES,
  VERDICTS,
  PURCHASE_LADDER,
} from "../data/styleRules.js";

export const REQUIRED_SLOTS = ["suit", "shirt", "shoes"];

const SLOT_NOUNS = { suit: "a suit", shirt: "a shirt", shoes: "shoes" };

const failById = HARD_FAILS.reduce((acc, f) => {
  acc[f.id] = f;
  return acc;
}, {});

function toneFor(earned, max) {
  if (max <= 0) return "good";
  const pct = earned / max;
  if (pct >= 0.85) return "good";
  if (pct >= 0.5) return "warn";
  return "bad";
}

// A single scored rule.
function check(id, label, earned, max, note) {
  const clamped = Math.max(0, Math.min(max, earned));
  return { id, label, earned: clamped, max, note, tone: toneFor(clamped, max) };
}

/* ------------------------------------------------------------------ fit ---- */

function scoreFit(pieces, fit) {
  const checks = FIT_CHECKS.map((c) => {
    const value = typeof fit[c.id] === "number" ? fit[c.id] : DEFAULT_FIT[c.id];
    const option = c.options.find((o) => o.value === value) || c.options[1];
    return check(c.id, c.label, value, 2, option.note);
  });

  const quality = SUIT_FIT_QUALITY[pieces.suit?.fit] || SUIT_FIT_QUALITY.tailored;
  checks.push(check("build", "Cut and construction", quality.factor * 3, 3, quality.note));

  return checks;
}

/* ------------------------------------------------------------ formality ---- */

function presentFormalities(pieces) {
  return Object.values(pieces)
    .filter(Boolean)
    .map((item) => item.formality)
    .filter((n) => typeof n === "number");
}

function scoreFormality(pieces, context) {
  const checks = [];
  const values = presentFormalities(pieces);
  const spread = values.length > 1 ? Math.max(...values) - Math.min(...values) : 0;

  let coherence = 0;
  let coherenceNote;
  if (spread <= 0.9) {
    coherence = 3;
    coherenceNote = "Every piece is sitting at the same altitude. That is what reads as expensive.";
  } else if (spread <= 1.5) {
    coherence = 2.1;
    coherenceNote = "Close, but one or two pieces are pulling the outfit down a level.";
  } else if (spread <= 2.2) {
    coherence = 1.1;
    coherenceNote =
      "The pieces are arguing. Something formal is carrying something casual, and both lose.";
  } else {
    coherence = 0;
    coherenceNote =
      "This is two different outfits wearing each other. Pick one level and commit to it.";
  }
  checks.push(check("coherence", "Formality coherence", coherence, 3, coherenceNote));

  // The context average is judged on the core garments only — a watch or a pair
  // of cufflinks should not be able to drag the read of the outfit.
  const core = [pieces.suit, pieces.shirt, pieces.tie, pieces.shoes]
    .filter(Boolean)
    .map((item) => item.formality);
  const avg = core.length ? core.reduce((a, b) => a + b, 0) / core.length : 0;
  const gap = Math.abs(avg - context.target);
  let ctxScore;
  let ctxNote;
  if (gap <= 0.35) {
    ctxScore = 3;
    ctxNote = `Pitched correctly for ${context.label.toLowerCase()}.`;
  } else if (gap <= 0.75) {
    ctxScore = 2;
    ctxNote =
      avg < context.target
        ? `Slightly under-dressed for ${context.label.toLowerCase()}. Nobody will say it out loud.`
        : `A touch formal for ${context.label.toLowerCase()}. Not a problem, just noticeable.`;
  } else {
    ctxScore = 0.6;
    ctxNote =
      avg < context.target
        ? `Too casual for ${context.label.toLowerCase()}. You will spend the first ten minutes earning back ground you gave away for free.`
        : `Overdressed for ${context.label.toLowerCase()}. Formality you did not need reads as trying.`;
  }
  checks.push(check("context", `Right for the ${context.label.toLowerCase()}`, ctxScore, 3, ctxNote));

  if (pieces.suit) {
    const rule = SUIT_COLOUR_SCORE[pieces.suit.colour] || { score: 1.4, note: "Unusual suit colour." };
    let score = rule.score;
    let note = rule.note;
    if (pieces.suit.colour === "black") {
      if (context.id === "funeral") {
        score = 3;
        note = "Black is the correct answer here, and the only one.";
      } else if (context.id === "evening") {
        score = 2.2;
        note = "Black works after dark. In daylight it would be a mistake.";
      }
    }
    checks.push(check("suitColour", "Suit colour", score, 3, note));
  }

  if (pieces.shirt) {
    const rule = SHIRT_COLOUR_SCORE[pieces.shirt.colour] || {
      score: 1.2,
      note: "That shirt colour is doing more talking than you are.",
    };
    checks.push(check("shirtColour", "Shirt colour", rule.score, 3, rule.note));
  }

  if (pieces.shoes) {
    const s = SHOE_STYLE_SCORE[pieces.shoes.style] ?? 1;
    const note =
      s >= 3
        ? "Oxford. Closed lacing, cleanest line, correct in every room you will enter."
        : s >= 2
          ? "A Derby is a half-step down from an Oxford. Acceptable, not the standard."
          : s >= 1.5
            ? "Monk straps are fashion-forward. Fine in finance, bold in court."
            : "That shoe is a level or two below the suit above it.";
    checks.push(check("shoeStyle", "Shoe formality", s, 3, note));
  }

  const formal = context.target >= 3.5;
  checks.push(
    check(
      "tiePresent",
      "Neckwear",
      pieces.tie ? 2 : formal ? 0 : 1.2,
      2,
      pieces.tie
        ? "There is a tie. In this room that is not optional, it is the entry fee."
        : formal
          ? `No tie for ${context.label.toLowerCase()}. An open collar under a suit is a different job title.`
          : "Open collar. Acceptable here, but it costs you half a level of authority.",
    ),
  );

  return checks;
}

/* --------------------------------------------------------------- colour ---- */

function scoreColour(pieces) {
  const checks = [];
  const { suit, shirt, tie, shoes, waist } = pieces;

  if (suit && shirt) {
    const rule = SHIRT_COLOUR_SCORE[shirt.colour] || { score: 1.2 };
    const dark = ["charcoal", "navy", "black"].includes(suit.colour);
    const score = dark ? rule.score : Math.min(3, rule.score + 0.3);
    checks.push(
      check(
        "shirtSuit",
        "Shirt against suit",
        score,
        3,
        dark
          ? "Dark suit, light shirt. The contrast is what frames your face."
          : "Lighter suit softens the contrast. Keep the shirt clean and pale.",
      ),
    );
  }

  if (suit && shoes) {
    const row = SHOE_SUIT_MATRIX[shoes.colour] || {};
    const raw = row[suit.colour];
    const value = typeof raw === "number" ? raw : 1.6;
    checks.push(
      check(
        "shoeSuit",
        "Shoes against suit",
        Math.max(0, value),
        3,
        value < 0
          ? "Those shoes and that suit are speaking different languages."
          : value >= 2.6
            ? "Correct pairing. The shoes finish the suit instead of interrupting it."
            : "Workable, but not the strongest pairing you could make from this closet.",
      ),
    );
  }

  if (shoes && waist && waist.type === "belt") {
    const allowed = BELT_MATCH[shoes.colour] || [];
    const ok = allowed.includes(waist.colour);
    checks.push(
      check(
        "beltShoe",
        "Belt against shoes",
        ok ? 2 : 0,
        2,
        ok
          ? "Belt and shoes agree. Nobody notices this until it is wrong."
          : "Belt and shoes do not match. It is the oldest rule there is and the easiest to keep.",
      ),
    );
  }

  if (suit && tie) {
    let value;
    let note;
    if (tie.colour === suit.colour) {
      value = 0.9;
      note = "The tie is disappearing into the suit. You need separation, not camouflage.";
    } else {
      const sameFamily =
        (["charcoal", "navy", "black"].includes(tie.colour) &&
          ["charcoal", "navy", "black"].includes(suit.colour)) ||
        false;
      value = sameFamily ? 2 : 2.6;
      note = sameFamily
        ? "Both dark neutrals. Elegant, quiet, slightly flat under bad lighting."
        : "Deep, saturated, clearly separated from the cloth behind it. That is the move.";
    }
    checks.push(check("tieSuit", "Tie against suit", value, 2.6, note));
  }

  return checks;
}

/* -------------------------------------------------------------- pattern ---- */

function scorePattern(pieces) {
  const checks = [];
  const patterned = [pieces.suit, pieces.shirt, pieces.tie, pieces.pocketSquare]
    .filter(Boolean)
    .map((item) => ({
      item,
      weight: PATTERN_WEIGHT[item.pattern] ?? 0,
      scale: item.patternScale ?? 0,
    }))
    .filter((p) => p.weight > 0);

  const count = patterned.length;
  let countScore;
  let countNote;
  if (count === 0) {
    countScore = 2.4;
    countNote = "All solid. Safe, sober, and slightly anonymous. One pattern would lift it.";
  } else if (count <= 2) {
    countScore = 3;
    countNote = `${count} pattern${count === 1 ? "" : "s"}. Restrained, deliberate, easy to read.`;
  } else if (count === 3) {
    countScore = 1.4;
    countNote = "Three patterns is one more than the eye wants. Drop the weakest one.";
  } else {
    countScore = 0;
    countNote = "Four patterns. This is noise, and noise reads as chaos.";
  }
  checks.push(check("patternCount", "Pattern discipline", countScore, 3, countNote));

  let scaleScore = 3;
  let scaleNote = "Nothing is competing. Scales are far enough apart to coexist.";
  if (count >= 2) {
    const scales = patterned.map((p) => p.scale);
    const collision = scales.some((s, i) => scales.indexOf(s) !== i);
    if (collision) {
      scaleScore = 1;
      scaleNote =
        "Two patterns at the same scale. They vibrate against each other. Change one to a bigger or smaller repeat.";
    }
  }
  checks.push(check("patternScale", "Scale contrast", scaleScore, 3, scaleNote));

  const load = patterned.reduce((sum, p) => sum + p.weight, 0);
  const loadScore = load <= 2 ? 2 : load <= 3.5 ? 1.2 : 0;
  checks.push(
    check(
      "patternLoad",
      "Pattern weight",
      loadScore,
      2,
      load <= 2
        ? "The patterns you are wearing are small and quiet. Correct for this room."
        : "The patterns are too large or too loud for a business context. Scale them down.",
    ),
  );

  return checks;
}

/* ------------------------------------------------------------ signature ---- */

function scoreSignature(pieces) {
  const checks = [];
  const { suit, shirt, tie, pocketSquare, waist, watch, cufflinks } = pieces;

  if (suit) {
    const threePiece = suit.pieces === 3;
    const dressed = Boolean(tie && pocketSquare);
    checks.push(
      check(
        "threePiece",
        "Three-piece",
        threePiece ? 3 : dressed ? 1.5 : 0.6,
        3,
        threePiece
          ? "Three-piece. The waistcoat closes the silhouette even with the jacket open."
          : dressed
            ? "Two-piece carried by a tie and a square. Respectable. Not the signature."
            : "Two-piece with nothing finishing it. This is where the look starts, not ends.",
      ),
    );

    const lapel =
      suit.lapel === "peak" ? 2 : suit.lapel === "shawl" ? 1.2 : suit.lapel === "semi" ? 1.4 : 0.7;
    checks.push(
      check(
        "lapel",
        "Lapel",
        lapel,
        2,
        suit.lapel === "peak"
          ? "Peak lapel. It points up toward the shoulder and takes the whole silhouette with it."
          : "Notch lapel is correct and unremarkable. Peak is the upgrade when you want the room to notice.",
      ),
    );

    const shoulder =
      suit.shoulder === "structured" ? 1.5 : suit.shoulder === "soft" ? 0.9 : 0.4;
    checks.push(
      check(
        "shoulder",
        "Shoulder line",
        shoulder,
        1.5,
        suit.shoulder === "structured"
          ? "Structured shoulder holding a clean line. Not padded into the eighties."
          : "A soft or collapsed shoulder loses the line. This look wants some architecture.",
      ),
    );
  }

  if (shirt) {
    const collar = COLLAR_SCORE[shirt.collar] ?? 1;
    checks.push(
      check(
        "collar",
        "Collar",
        (collar / 3) * 2,
        2,
        collar >= 3
          ? "Spread collar. It gives the knot room and frames the face properly."
          : collar === 0
            ? "A button-down collar is a casual collar. It will not carry this suit."
            : "That collar is narrower than the lapels above it. The proportions fight.",
      ),
    );

    const cuff = CUFF_SCORE[shirt.cuff] ?? 1;
    const hasLinks = Boolean(cufflinks);
    const value = shirt.cuff === "french" ? (hasLinks ? 2 : 1) : (cuff / 3) * 2;
    checks.push(
      check(
        "cuff",
        "Cuff",
        value,
        2,
        shirt.cuff === "french"
          ? hasLinks
            ? "Double cuff with links. A deliberate detail that shows every time you move your hand."
            : "Double cuffs with nothing holding them. Add the cufflinks or wear a barrel cuff."
          : "Barrel cuffs are fine. A double cuff is the version people remember.",
      ),
    );
  }

  if (pocketSquare) {
    const fold = POCKET_SQUARE_SCORE[pocketSquare.fold] ?? 1;
    const white = pocketSquare.colour === "white";
    const linen = pocketSquare.material === "linen" || pocketSquare.material === "silk";
    const value = Math.min(2.5, (fold / 3) * 1.6 + (white ? 0.5 : 0.1) + (linen ? 0.4 : 0));
    checks.push(
      check(
        "square",
        "Pocket square",
        value,
        2.5,
        white && pocketSquare.fold === "presidential"
          ? "White linen, presidential fold. It says you have nothing to prove."
          : "It works, but the white linen flat fold is the one that never has to be explained.",
      ),
    );
  } else {
    checks.push(
      check("square", "Pocket square", 0, 2.5, "No pocket square. The chest is empty and it shows."),
    );
  }

  if (suit && suit.pieces === 3 && waist) {
    checks.push(
      check(
        "braces",
        "Waist",
        waist.type === "braces" ? 1 : 0.2,
        1,
        waist.type === "braces"
          ? "Braces under a waistcoat. Trousers stay at one height all day."
          : "A belt under a waistcoat is a lump nobody needs. Braces, or nothing.",
      ),
    );
  }

  checks.push(
    check(
      "watch",
      "Watch",
      watch ? (watch.type === "dress" ? 1 : 0.2) : 0.3,
      1,
      watch
        ? watch.type === "dress"
          ? "A dress watch disappears under the cuff and appears when you move. That is the point."
          : "A sports watch under a suit cuff is two formality signals shouting over each other."
        : "No watch. Bare wrist under a double cuff is a missed line, not a crime.",
    ),
  );

  return checks;
}

/* -------------------------------------------------------------- details ---- */

function metalsOf(pieces) {
  return [pieces.watch, pieces.cufflinks, pieces.tieBar, pieces.waist]
    .filter(Boolean)
    .map((item) => item.metal)
    .filter(Boolean);
}

function scoreDetails(pieces) {
  const checks = [];
  const { suit, tie, shoes, socks, waist, cufflinks, tieBar, shirt } = pieces;

  if (suit && tie) {
    const delta = Math.abs((tie.width ?? 3) - (suit.lapelWidth ?? 3.2));
    const value = delta <= 0.35 ? 2 : delta <= 0.65 ? 1.1 : 0;
    checks.push(
      check(
        "tieWidth",
        "Tie against lapel",
        value,
        2,
        delta <= 0.35
          ? "Tie width answers the lapel. Proportion is the whole game."
          : (tie.width ?? 3) < (suit.lapelWidth ?? 3.2)
            ? "The tie is too narrow for those lapels. It makes the chest look wider than it is."
            : "The tie is wider than the lapels can carry. Everything above the waist looks heavy.",
      ),
    );
  }

  if (!socks) {
    checks.push(
      check(
        "socks",
        "Socks",
        0.4,
        2,
        "You have not told me what is on your feet. Match the trouser and it stops being a question.",
      ),
    );
  }

  if (socks && suit) {
    const matched = socks.colour === suit.colour;
    const neutral = ["charcoal", "navy", "midGrey", "black"].includes(socks.colour);
    const value = matched ? 2 : neutral ? 1.3 : 0;
    checks.push(
      check(
        "socks",
        "Socks",
        value,
        2,
        matched
          ? "Socks match the trouser. The leg reads as one continuous line."
          : neutral
            ? "Dark and inoffensive, but not matched to the trouser. Close, not correct."
            : "Those socks cut your leg in half at the ankle. Match the trouser, never the shoe.",
      ),
    );
    checks.push(
      check(
        "sockLength",
        "Sock length",
        socks.length === "otc" ? 1 : socks.length === "crew" ? 0.5 : 0,
        1,
        socks.length === "otc"
          ? "Over the calf. Nothing shows when you sit down."
          : "Short socks show shin the moment you cross your legs. Buy over-the-calf and never think about it again.",
      ),
    );
  }

  const metals = metalsOf(pieces);
  if (metals.length > 1) {
    const consistent = metals.every((m) => m === metals[0]);
    checks.push(
      check(
        "metals",
        "Metal consistency",
        consistent ? 2 : 0,
        2,
        consistent
          ? "One metal tone throughout. Quiet, and it is why the details look intentional."
          : "You are mixing silver and gold. Pick one tone and take the other pieces off.",
      ),
    );
  }

  if (tie && tieBar) {
    const correct = tieBar.placement === "correct" && (tieBar.width ?? 2) < (tie.width ?? 3);
    checks.push(
      check(
        "tieBar",
        "Tie bar",
        correct ? 2 : 0,
        2,
        correct
          ? "Tie bar narrower than the tie, sitting between the third and fourth buttons. Precise."
          : "That tie bar is too wide or too high. A detail done wrong is worse than one left out.",
      ),
    );
  }

  if (suit) {
    const threePiece = suit.pieces === 3;
    let value;
    let note;
    if (threePiece && waist?.type === "braces") {
      value = 2;
      note = "Braces with a three-piece. Textbook.";
    } else if (threePiece && waist?.type === "belt") {
      value = 0.5;
      note = "Belt under a waistcoat. It bulks the waist and you will never see it anyway.";
    } else if (!threePiece && waist?.type === "belt") {
      value = 2;
      note = "Belt with a two-piece, matched to the shoes. Correct.";
    } else if (!threePiece && !waist) {
      value = 1;
      note = "No belt with a two-piece leaves the waist unfinished unless the trousers are side-adjusted.";
    } else {
      value = 1.6;
      note = "Waist handled without a belt. Fine, as long as the trousers stay put.";
    }
    checks.push(check("waistSolution", "Belt or braces", value, 2, note));
  }

  if (shoes) {
    const value =
      shoes.condition === "mirror" ? 2 : shoes.condition === "polished" ? 1.4 : 0;
    checks.push(
      check(
        "shoeCare",
        "Shoe condition",
        value,
        2,
        shoes.condition === "mirror"
          ? "Mirror polish. People who know clothes look at shoes first."
          : shoes.condition === "polished"
            ? "Clean and cared for. Twenty minutes and a brush takes this to the top."
            : "Scuffed and unpolished. It undoes everything above the ankle.",
      ),
    );
  }

  if (cufflinks) {
    checks.push(
      check(
        "links",
        "Cufflinks",
        cufflinks.style === "novelty" ? 0 : 2,
        2,
        cufflinks.style === "novelty"
          ? "Novelty cufflinks. A joke at your own expense, repeated all day."
          : "Simple, quality cufflinks. Conservative is the correct answer here.",
      ),
    );
  } else if (shirt?.cuff === "french") {
    checks.push(
      check("links", "Cufflinks", 0, 2, "Double cuffs need cufflinks. Right now they are just flapping."),
    );
  }

  return checks;
}

/* ---------------------------------------------------------- hard failures --- */

function findHardFails(pieces, fit) {
  const ids = [];
  const { suit, shirt, tie, shoes, pocketSquare, waist, socks } = pieces;

  if (shoes?.toe === "square") ids.push("square-toe");
  if (suit?.fabric === "polyester") ids.push("polyester-suit");
  if (tie?.material === "polyester") ids.push("polyester-tie");
  if (fit.cuff === 0) ids.push("no-cuff");
  if (fit.collar === 0) ids.push("collar-gap");
  if (fit.break === 0) ids.push("puddling");

  if (tie && pocketSquare) {
    const boxed = pocketSquare.matchesTieSet === true;
    const identical =
      pocketSquare.colour === tie.colour && (pocketSquare.pattern ?? "solid") === (tie.pattern ?? "solid");
    if (boxed || identical) ids.push("matching-set");
  }

  if (socks && suit) {
    const darkSuit = ["charcoal", "navy", "black", "midGrey"].includes(suit.colour);
    if (socks.colour === "white" && darkSuit) ids.push("white-socks");
  }

  if (shoes && suit) {
    const row = SHOE_SUIT_MATRIX[shoes.colour] || {};
    if (row[suit.colour] < 0) ids.push("brown-black");
  }

  if (shoes && waist?.type === "belt") {
    const allowed = BELT_MATCH[shoes.colour] || [];
    if (!allowed.includes(waist.colour)) ids.push("shoe-belt-clash");
  }

  // `shirt` is only referenced for completeness; button-down collars are a soft
  // penalty handled in the signature dimension, not a hard failure.
  void shirt;

  return ids.map((id) => failById[id]).filter(Boolean);
}

/* ----------------------------------------------------------------- grade --- */

export function gradeFor(score) {
  return GRADES.find((g) => score >= g.min) || GRADES[GRADES.length - 1];
}

function verdictFor(score, band, hardFails) {
  const pool = VERDICTS[band] || VERDICTS.solid;
  const line = pool[Math.abs(Math.round(score)) % pool.length];
  if (hardFails.length) {
    return `${line} And before anything else: ${hardFails[0].label.toLowerCase()}.`;
  }
  return line;
}

/* ------------------------------------------------------------ the engine --- */

export function scoreOutfit(outfit = {}) {
  const items = outfit.items || {};
  const fit = { ...DEFAULT_FIT, ...(outfit.fit || {}) };
  const context =
    CONTEXTS.find((c) => c.id === outfit.context) || CONTEXTS[0];

  const pieces = Object.keys(items).reduce((acc, slot) => {
    acc[slot] = getItem(items[slot]);
    return acc;
  }, {});

  const missing = REQUIRED_SLOTS.filter((slot) => !pieces[slot]);
  if (missing.length) {
    return {
      complete: false,
      missing,
      score: 0,
      grade: "—",
      band: "incomplete",
      verdict:
        missing.length === REQUIRED_SLOTS.length
          ? "Nothing on the rail yet. Start with the suit."
          : `Add ${missing.map((m) => SLOT_NOUNS[m] || m).join(" and ")}, then I will tell you what you are actually wearing.`,
      dimensions: DIMENSIONS.map((d) => ({ ...d, earned: 0, max: 0, pct: 0, points: 0, checks: [] })),
      fixes: [],
      hardFails: [],
      context,
      pieces,
    };
  }

  const byDimension = {
    fit: scoreFit(pieces, fit),
    formality: scoreFormality(pieces, context),
    colour: scoreColour(pieces),
    pattern: scorePattern(pieces),
    signature: scoreSignature(pieces),
    details: scoreDetails(pieces),
  };

  const dimensions = DIMENSIONS.map((dim) => {
    const checks = byDimension[dim.id] || [];
    const earned = checks.reduce((sum, c) => sum + c.earned, 0);
    const max = checks.reduce((sum, c) => sum + c.max, 0);
    const pct = max > 0 ? earned / max : 1;
    return { ...dim, checks, earned, max, pct, points: pct * dim.weight };
  });

  let raw = dimensions.reduce((sum, d) => sum + d.points, 0);

  const hardFails = findHardFails(pieces, fit);
  const cap = hardFails.reduce((lowest, f) => Math.min(lowest, f.cap), 100);
  const capped = Math.min(raw, cap);
  const score = Math.max(0, Math.round(capped));

  // Ranked fixes: biggest recoverable points first.
  const fixes = [];
  hardFails.forEach((f) => {
    fixes.push({
      id: f.id,
      dimension: "Hard rule",
      label: f.label,
      detail: f.detail,
      gain: Math.max(2, Math.round(Math.min(raw, 100) - f.cap)),
      severity: "critical",
    });
  });

  dimensions.forEach((dim) => {
    dim.checks.forEach((c) => {
      const lost = c.max - c.earned;
      if (lost < 0.2 || dim.max === 0) return;
      fixes.push({
        id: `${dim.id}:${c.id}`,
        dimension: dim.label,
        label: c.label,
        detail: c.note,
        gain: Math.round((lost / dim.max) * dim.weight * 10) / 10,
        severity: c.tone === "bad" ? "high" : "medium",
      });
    });
  });

  fixes.sort((a, b) => {
    if (a.severity === "critical" && b.severity !== "critical") return -1;
    if (b.severity === "critical" && a.severity !== "critical") return 1;
    return b.gain - a.gain;
  });

  const { grade, band } = gradeFor(score);

  return {
    complete: true,
    missing: [],
    score,
    rawScore: Math.round(raw),
    capped: capped < raw,
    cap,
    grade,
    band,
    verdict: verdictFor(score, band, hardFails),
    dimensions,
    fixes: fixes.slice(0, 8),
    hardFails,
    context,
    pieces,
  };
}

/* -------------------------------------------------------- next purchase ---- */

export function nextPurchase(closetIds = [], lastResult = null) {
  const owned = closetIds.map(getItem).filter(Boolean);
  const owns = catalog.reduce((acc, item) => {
    acc[item.slot] = acc[item.slot] || [];
    return acc;
  }, {});
  Object.keys(owns).forEach((slot) => {
    owns[slot] = owned.filter((item) => item.slot === slot);
  });

  const fitDim = lastResult?.dimensions?.find((d) => d.id === "fit");
  const ctx = { owns, fitScore: fitDim ? fitDim.pct : 1 };

  const hit = PURCHASE_LADDER.find((rule) => {
    try {
      return rule.test(ctx);
    } catch {
      return false;
    }
  });

  return (
    hit || {
      id: "nothing",
      item: "Nothing. Wear what you own.",
      why: "Your closet already covers every room you have told me about. The next upgrade is how you carry it.",
      cost: "—",
    }
  );
}

/* ------------------------------------------------------ best possible ------ */

// Greedy search: for each slot, keep the item from the user's closet that scores
// highest with everything else held constant. Two passes settle most conflicts.
export function bestOutfit(closetIds = [], { fit, context } = {}) {
  const owned = closetIds.map(getItem).filter(Boolean);
  const slots = ["suit", "shirt", "tie", "shoes", "pocketSquare", "waist", "watch", "cufflinks", "tieBar", "socks"];

  const items = {};
  slots.forEach((slot) => {
    const first = owned.find((item) => item.slot === slot);
    items[slot] = first ? first.id : null;
  });

  let best = scoreOutfit({ items, fit, context });

  for (let pass = 0; pass < 2; pass += 1) {
    slots.forEach((slot) => {
      const options = owned.filter((item) => item.slot === slot).map((item) => item.id);
      const candidates = options.concat(slot === "suit" || slot === "shirt" || slot === "shoes" ? [] : [null]);
      candidates.forEach((candidate) => {
        const trial = { ...items, [slot]: candidate };
        const result = scoreOutfit({ items: trial, fit, context });
        if (result.complete && result.score > best.score) {
          best = result;
          items[slot] = candidate;
        }
      });
    });
  }

  return { items, result: best };
}

export default scoreOutfit;
