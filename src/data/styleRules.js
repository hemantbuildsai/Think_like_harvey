// The rule table the scoring engine reads.
//
// Everything here is data, not logic — thresholds, matrices, weights and the
// human sentences that get shown back to the user. Change a number here and the
// engine's behaviour changes without touching outfitScore.js.

export const DIMENSIONS = [
  {
    id: "fit",
    label: "Fit",
    weight: 25,
    blurb: "Shoulder, cuff, break, collar. Nothing else can rescue this.",
  },
  {
    id: "formality",
    label: "Formality",
    weight: 20,
    blurb: "Every piece has to sit at the same altitude, and the right one for the room.",
  },
  {
    id: "colour",
    label: "Colour",
    weight: 15,
    blurb: "Suit against shirt, shoes against belt, tie against everything.",
  },
  {
    id: "pattern",
    label: "Pattern",
    weight: 12,
    blurb: "Scale contrast and restraint. Two is a conversation, four is a riot.",
  },
  {
    id: "signature",
    label: "Signature",
    weight: 15,
    blurb: "Three-piece, peak lapel, spread collar, French cuff, white linen square.",
  },
  {
    id: "details",
    label: "Details",
    weight: 13,
    blurb: "Proportion, metals, socks, the things only the informed notice.",
  },
];

// The fit questions the builder asks. Scores are 0-2 per the research checklist.
export const FIT_CHECKS = [
  {
    id: "shoulder",
    label: "Shoulder seam",
    question: "Where does the shoulder seam land?",
    options: [
      { value: 2, label: "On the bone", note: "Exactly at the shoulder point. Nothing to fix." },
      { value: 1, label: "Close enough", note: "Slightly off, but nobody is measuring." },
      {
        value: 0,
        label: "Divots or overhang",
        note: "Dents below the armcap or seam sliding down the arm. This cannot be altered — it has to be the right jacket.",
      },
    ],
  },
  {
    id: "cuff",
    label: "Shirt cuff",
    question: "How much shirt cuff shows below the jacket sleeve?",
    options: [
      { value: 2, label: "A quarter to a half inch", note: "The signal. Consistently visible." },
      { value: 1, label: "A sliver, or a little much", note: "In range, but not deliberate." },
      {
        value: 0,
        label: "None showing",
        note: "The single loudest sign of an untouched off-the-rack jacket. A tailor fixes this in a week.",
      },
    ],
  },
  {
    id: "break",
    label: "Trouser break",
    question: "What happens where the trouser meets the shoe?",
    options: [
      { value: 2, label: "Clean half break", note: "One soft dent. Controlled and intentional." },
      { value: 1, label: "No break", note: "Modern and acceptable on a slim trouser." },
      {
        value: 0,
        label: "Puddling or full break",
        note: "Fabric folding front and back. The most correctable error most men never correct.",
      },
    ],
  },
  {
    id: "collar",
    label: "Jacket collar",
    question: "Does the jacket collar stay against your shirt collar?",
    options: [
      { value: 2, label: "Flat and snug", note: "Stays in contact when you move." },
      { value: 1, label: "Lifts when I move", note: "Borderline. Watch it when you sit." },
      {
        value: 0,
        label: "Visible gap",
        note: "The first thing a tailor sees. Visible from across the room.",
      },
    ],
  },
  {
    id: "waist",
    label: "Waist",
    question: "Buttoned up, is there a waist?",
    options: [
      { value: 2, label: "Clear V-shape", note: "Suppressed waist, slight flare at the hem." },
      { value: 1, label: "Some shape", note: "There is a waist. It is just being polite about it." },
      { value: 0, label: "Straight column", note: "Boxy. The silhouette is doing nothing for you." },
    ],
  },
];

export const DEFAULT_FIT = { shoulder: 1, cuff: 1, break: 1, collar: 1, waist: 1 };

// Multiplier applied to the fit dimension based on the garment's own build quality.
export const SUIT_FIT_QUALITY = {
  tailored: { factor: 1, note: "Tailored. The cloth is working for you." },
  offTheRack: {
    factor: 0.72,
    note: "Straight off the rack and unaltered. Even good cloth looks borrowed.",
  },
  tooTight: { factor: 0.68, note: "Pulling at the button. X-wrinkles read as insecurity." },
  loose: { factor: 0.7, note: "Hanging away from the body. Nothing is being framed." },
};

// Shirt colours ranked against a dark suit.
export const SHIRT_COLOUR_SCORE = {
  white: { score: 3, note: "White. The sharpest contrast there is." },
  paleBlue: { score: 2.6, note: "Pale blue. Softer than white, just as serious." },
  frenchBlue: { score: 1.4, note: "French blue reads casual under a dark business suit." },
  pink: { score: 1.4, note: "Pale pink works in some rooms. Not the ones you are dressing for." },
  lavender: { score: 1.2, note: "Lavender is a Friday colour." },
};

// Suit colour, judged for a business context.
export const SUIT_COLOUR_SCORE = {
  charcoal: { score: 3, note: "Charcoal. The most useful suit colour ever made." },
  navy: { score: 3, note: "Navy. Authority without severity." },
  midGrey: { score: 2.2, note: "Mid grey. Correct, slightly friendlier, slightly less weight." },
  lightGrey: { score: 1.2, note: "Light grey is a daylight suit. It gives away altitude." },
  black: { score: 1, note: "A black suit belongs at a wedding or a funeral, not a negotiation." },
  burgundy: { score: 1.6, note: "Burgundy is an evening move. Deliberate, but never neutral." },
  teal: { score: 1.6, note: "Dark teal is a personality choice. Keep everything else silent." },
  brown: { score: 1, note: "Brown suits belong in the country." },
};

// Shoe colour against suit colour. -1 means an outright clash.
export const SHOE_SUIT_MATRIX = {
  black: { black: 3, charcoal: 3, navy: 2.6, midGrey: 2.4, lightGrey: 1.8, burgundy: 2.2, teal: 2.4 },
  oxblood: { black: 0.6, charcoal: 2.8, navy: 3, midGrey: 2.6, lightGrey: 2.2, burgundy: 1.4, teal: 2.6 },
  darkBrown: { black: -1, charcoal: 2, navy: 2.8, midGrey: 2.6, lightGrey: 2.4, burgundy: 1.6, teal: 2.4 },
  brown: { black: -1, charcoal: 1.4, navy: 2.4, midGrey: 2.4, lightGrey: 2.4, burgundy: 1.2, teal: 2 },
  tan: { black: -1, charcoal: 0.8, navy: 1.6, midGrey: 1.8, lightGrey: 2.2, burgundy: 0.8, teal: 1.4 },
};

// Belts that are allowed to sit under a given shoe colour.
export const BELT_MATCH = {
  black: ["black"],
  oxblood: ["oxblood", "burgundy", "darkBrown"],
  darkBrown: ["darkBrown", "brown"],
  brown: ["brown", "darkBrown", "tan"],
  tan: ["tan", "brown"],
};

// Tie colour against suit colour: a tie should separate from the cloth behind it.
export const TIE_CONTRAST = {
  strong: 2.6,
  fine: 2,
  flat: 0.9,
};

export const SHOE_STYLE_SCORE = {
  oxford: 3,
  derby: 2.2,
  monk: 1.8,
  loafer: 0.8,
  brogue: 0.4,
};

export const COLLAR_SCORE = {
  cutaway: 3,
  spread: 3,
  tab: 2.4,
  club: 1.6,
  point: 1.2,
  buttonDown: 0,
};

export const CUFF_SCORE = {
  french: 3,
  barrel: 1.2,
};

export const POCKET_SQUARE_SCORE = {
  presidential: 3,
  point: 2,
  puff: 1,
};

export const PATTERN_WEIGHT = {
  solid: 0,
  texture: 0.5,
  pinstripe: 1,
  chalkstripe: 1,
  stripe: 1,
  dot: 1,
  geometric: 1,
  glenplaid: 1.5,
  paisley: 1.5,
  check: 2,
};

// Absolute rules. Each one caps the total score at `cap` no matter what else is right.
export const HARD_FAILS = [
  {
    id: "square-toe",
    cap: 58,
    label: "Square-toe shoes",
    detail:
      "No menswear authority alive defends them. Round or gently chiselled, nothing else. This one caps the whole outfit.",
  },
  {
    id: "matching-set",
    cap: 66,
    label: "Matching tie and pocket square",
    detail:
      "A boxed set announces that somebody else made the decision. The square complements the tie. It never repeats it.",
  },
  {
    id: "no-cuff",
    cap: 64,
    label: "No shirt cuff showing",
    detail:
      "It is the primary evidence of a fitted jacket. Without it, the best cloth in the room reads as borrowed.",
  },
  {
    id: "collar-gap",
    cap: 66,
    label: "Collar gap",
    detail:
      "The jacket collar standing away from your neck is the first thing anyone who knows clothes will see.",
  },
  {
    id: "puddling",
    cap: 68,
    label: "Trousers puddling",
    detail: "Fabric folding at the shoe is the cheapest error to fix and the easiest one to spot.",
  },
  {
    id: "polyester-suit",
    cap: 55,
    label: "Polyester suit",
    detail:
      "Wrong sheen, wrong drape, wrong breathability. It is identifiable from two metres away.",
  },
  {
    id: "polyester-tie",
    cap: 70,
    label: "Polyester tie",
    detail: "It shines where silk glows and it will not hold a dimple.",
  },
  {
    id: "white-socks",
    cap: 60,
    label: "White socks with a dark suit",
    detail: "It cuts your leg in half at the ankle. Match the trouser, always.",
  },
  {
    id: "brown-black",
    cap: 68,
    label: "Brown shoes with a black suit",
    detail: "Two different formality languages arguing at your ankles.",
  },
  {
    id: "shoe-belt-clash",
    cap: 72,
    label: "Belt does not match the shoes",
    detail: "The oldest rule in the book, and the one people notice without knowing why.",
  },
];

export const GRADES = [
  { min: 95, grade: "A+", band: "immaculate" },
  { min: 90, grade: "A", band: "immaculate" },
  { min: 85, grade: "A-", band: "sharp" },
  { min: 80, grade: "B+", band: "sharp" },
  { min: 74, grade: "B", band: "solid" },
  { min: 68, grade: "B-", band: "solid" },
  { min: 60, grade: "C+", band: "workable" },
  { min: 52, grade: "C", band: "workable" },
  { min: 42, grade: "D", band: "rough" },
  { min: 0, grade: "F", band: "rough" },
];

export const VERDICTS = {
  immaculate: [
    "That is the outfit. Walk in like you already know how it lands.",
    "Nothing to fix. Now go and be worth the suit.",
    "This is what people mean when they say someone has presence. Go.",
  ],
  sharp: [
    "Sharp. Two details from untouchable, and you already know which ones.",
    "You look like the most prepared person in the room. Stay that way.",
    "Close. Fix the small things and nobody will be able to place why you look expensive.",
  ],
  solid: [
    "Solid. It works. It just does not do any of the work for you.",
    "Nobody will criticise this. Nobody will remember it either.",
    "This is competent. Competent is the floor, not the target.",
  ],
  workable: [
    "It is wearable. That is the nicest thing I am going to say about it.",
    "You are dressed. You are not dressed for the room you told me about.",
    "There is a good outfit inside this one. Go and find it.",
  ],
  rough: [
    "No. Change something before you leave the house.",
    "This is going to cost you credibility before you open your mouth.",
    "Start again. The fixes below are in order for a reason.",
  ],
};

// What to buy next, in priority order. First unmet condition wins.
export const PURCHASE_LADDER = [
  {
    id: "tailoring",
    test: (ctx) => ctx.fitScore < 0.7,
    item: "An hour with a tailor",
    why: "Before you buy anything else. Sleeves, waist, trouser hem. It is the cheapest upgrade in menswear and the only one everybody notices.",
    cost: "Low",
  },
  {
    id: "black-oxford",
    test: (ctx) => !ctx.owns.shoes.some((s) => s.style === "oxford" && s.colour === "black"),
    item: "Black cap-toe Oxfords",
    why: "The one shoe that is correct in every room you have described. Leather sole, closed lacing, no decoration.",
    cost: "High",
  },
  {
    id: "white-french",
    test: (ctx) => !ctx.owns.shirt.some((s) => s.colour === "white" && s.cuff === "french"),
    item: "A white spread-collar shirt with double cuffs",
    why: "It sits under every suit you own and it turns an ordinary two-piece into an occasion.",
    cost: "Medium",
  },
  {
    id: "linen-square",
    test: (ctx) => !ctx.owns.pocketSquare.some((p) => p.material === "linen"),
    item: "White linen pocket square",
    why: "The cheapest thing on this list and the fastest visible upgrade. Presidential fold, nothing else.",
    cost: "Low",
  },
  {
    id: "three-piece",
    test: (ctx) => !ctx.owns.suit.some((s) => s.pieces === 3),
    item: "A charcoal three-piece",
    why: "The waistcoat closes the silhouette when the jacket is open. It is the difference between wearing a suit and owning one.",
    cost: "High",
  },
  {
    id: "peak-lapel",
    test: (ctx) => !ctx.owns.suit.some((s) => s.lapel === "peak"),
    item: "A peak-lapel suit",
    why: "The lapel points up toward the shoulder and takes the whole silhouette with it. It is a decision, and it reads as one.",
    cost: "High",
  },
  {
    id: "braces",
    test: (ctx) => !ctx.owns.waist.some((w) => w.type === "braces"),
    item: "Silk braces",
    why: "With a three-piece, a belt is a lump under the waistcoat. Braces hold the trouser at one height all day.",
    cost: "Low",
  },
  {
    id: "dress-watch",
    test: (ctx) => !ctx.owns.watch.some((w) => w.type === "dress"),
    item: "A slim dress watch on a leather strap",
    why: "It should vanish under the cuff and appear when you reach for something. A dive watch cannot do that.",
    cost: "Medium",
  },
  {
    id: "second-tie",
    test: (ctx) => ctx.owns.tie.filter((t) => t.material === "silk").length < 3,
    item: "Two more solid silk ties, navy and burgundy",
    why: "Three good ties in deep colours outlast twelve interesting ones.",
    cost: "Medium",
  },
  {
    id: "otc-socks",
    test: (ctx) => !ctx.owns.socks.some((s) => s.length === "otc"),
    item: "Over-the-calf socks in charcoal and navy",
    why: "They never slip, and no one ever sees your shin when you cross your legs.",
    cost: "Low",
  },
];

export default {
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
};
