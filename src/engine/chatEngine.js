// Deterministic response composer. No network, no model — matching plus composition.

import brain from "../data/harveyBrain.js";

const { topics, openers, fallbacks, smallTalk, wisdom } = brain;

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "if", "then", "than", "so", "to", "of", "in", "on",
  "at", "for", "with", "is", "am", "are", "was", "were", "be", "been", "it", "this", "that",
  "my", "me", "i", "you", "your", "we", "they", "he", "she", "do", "does", "did", "have",
  "has", "had", "just", "very", "really", "about", "what", "how", "why", "when", "who",
]);

export function normalise(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text) {
  return normalise(text)
    .split(" ")
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

const SMALL_TALK_PATTERNS = [
  { key: "greeting", test: /^(hi|hey|hello|yo|good (morning|afternoon|evening)|sup|howdy)\b/ },
  { key: "howAreYou", test: /\bhow (are|r) (you|u)\b|\bhow's it going\b|\bhow are things\b/ },
  { key: "thanks", test: /\b(thanks|thank you|cheers|appreciate it|much appreciated)\b/ },
  { key: "bye", test: /\b(bye|goodbye|see you|later|good night|goodnight|i'm off)\b/ },
  {
    key: "compliment",
    test: /\b(you're (great|the best|amazing|good)|love (you|this)|legend|awesome|brilliant)\b/,
  },
  {
    key: "insult",
    test: /\b(you (suck|are useless|are stupid|are rubbish)|shut up|idiot|dumb bot)\b/,
  },
];

export function detectSmallTalk(text) {
  const t = normalise(text);
  if (t.split(" ").length > 9) return null;
  for (const p of SMALL_TALK_PATTERNS) {
    if (p.test.test(t)) return p.key;
  }
  return null;
}

export function scoreTopics(text) {
  const t = " " + normalise(text) + " ";
  const words = new Set(tokens(text));

  return topics
    .map((topic) => {
      let score = 0;
      for (const kw of topic.keywords) {
        if (kw.includes(" ")) {
          if (t.includes(" " + kw + " ") || t.includes(kw)) score += 2.4;
        } else if (words.has(kw)) {
          score += 1.4;
        } else if (t.includes(" " + kw)) {
          score += 0.7;
        }
      }
      if (words.has(topic.id)) score += 1;
      return { topic, score: score * (topic.weight || 1) };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

function pickIndex(usedMap, key, length) {
  const used = usedMap[key] || [];
  const unused = [];
  for (let i = 0; i < length; i += 1) if (!used.includes(i)) unused.push(i);
  const pool = unused.length ? unused : Array.from({ length }, (_, i) => i);
  const choice = pool[Math.floor(Math.random() * pool.length)];
  usedMap[key] = unused.length ? [...used, choice] : [choice];
  return choice;
}

function pick(list, usedMap, key) {
  return list[pickIndex(usedMap, key, list.length)];
}

const MODE_LEADS = {
  negotiate: [
    "Negotiation lens on this.",
    "Let's treat this as a deal, because it is one.",
    "Before tactics: position.",
  ],
  brainstorm: [
    "Let's put options on the table before we judge any of them.",
    "Three ways to play this. Then we cut.",
    "Widen it first, narrow it after.",
  ],
  tough: ["You asked for it straight, so here it is.", "No cushioning.", "Blunt version."],
  style: ["Style question. Good.", "Let's get the details right.", "Here's the standard."],
  counsel: [],
};

const BRAINSTORM_TAILS = [
  "Give me your three options and I'll tell you which one dies first.",
  "Name three paths. Even the one you think is stupid. Especially that one.",
  "Now do the inversion: what would guarantee failure here? Avoid that, and you're most of the way there.",
];

const TOUGH_TAILS = [
  "You didn't need me to tell you that. You needed someone to say it out loud.",
  "None of that is new to you. The doing is the part you've been skipping.",
  "That's the whole answer. The rest is you negotiating with yourself.",
];

function warmthPrefix(name) {
  return name ? name + "." : null;
}

export function extractName(text) {
  const m = normalise(text).match(/\b(?:i'm|im|i am|my name is|call me|this is)\s+([a-z]{2,15})\b/);
  if (!m) return null;
  const banned = new Set([
    "not", "so", "just", "really", "very", "the", "sorry", "here", "going", "trying",
    "struggling", "tired", "scared", "worried", "stuck", "done", "back", "afraid", "lost",
  ]);
  if (banned.has(m[1])) return null;
  return m[1][0].toUpperCase() + m[1].slice(1);
}

export function createSession() {
  return { used: {}, name: null, turns: 0, lastTopicId: null, problem: null };
}

function composeFromResponse(response, { mode, session, topicId }) {
  const style = mode?.style || {};
  const blocks = [];

  const lead = MODE_LEADS[mode?.id] || [];
  const isEmotional = topicId === "crisis-support";

  if (!isEmotional) {
    if (lead.length && Math.random() < 0.45) {
      blocks.push(pick(lead, session.used, "lead:" + mode.id));
    } else if (Math.random() < 0.4) {
      blocks.push(pick(openers, session.used, "opener"));
    }
  }

  const namePrefix = !isEmotional && session.name && Math.random() < 0.3
    ? warmthPrefix(session.name)
    : null;

  blocks.push(namePrefix ? namePrefix + " " + response.open : response.open);

  const coreCount = style.bluntness >= 1 && response.core.length > 1 ? 1 : response.core.length;
  response.core.slice(0, coreCount).forEach((c) => blocks.push(c));

  blocks.push(response.directive);

  if (!isEmotional) {
    if (mode?.id === "brainstorm") {
      blocks.push(pick(BRAINSTORM_TAILS, session.used, "brainstormTail"));
    } else if (mode?.id === "tough" && Math.random() < 0.5) {
      blocks.push(pick(TOUGH_TAILS, session.used, "toughTail"));
    } else if (response.followUp && (style.questions ?? 0.5) > 0.35) {
      blocks.push(response.followUp);
    } else if (session.turns > 2 && Math.random() < 0.25) {
      blocks.push(pick(wisdom, session.used, "wisdom"));
    }
  }

  return blocks.filter(Boolean);
}

export function respond(input, { mode, session }) {
  const text = String(input || "").trim();
  if (!text) {
    return { blocks: ["Say something. I can't work with silence."], topicId: null };
  }

  session.turns += 1;
  const name = extractName(text);
  if (name) session.name = name;

  const ranked = scoreTopics(text);
  const best = ranked[0];

  const crisis = ranked.find((r) => r.topic.id === "crisis-support");
  if (crisis && crisis.score > 0) {
    const response = pick(crisis.topic.responses, session.used, "crisis-support");
    session.lastTopicId = "crisis-support";
    return {
      blocks: composeFromResponse(response, { mode, session, topicId: "crisis-support" }),
      topicId: "crisis-support",
      label: crisis.topic.label,
    };
  }

  const chatter = detectSmallTalk(text);
  if (chatter && (!best || best.score < 3)) {
    const line = pick(smallTalk[chatter], session.used, "small:" + chatter);
    return { blocks: [line], topicId: "smalltalk:" + chatter, label: "Small talk" };
  }

  if (!best || best.score < 1.4) {
    const fb = pick(fallbacks, session.used, "fallback");
    return {
      blocks: composeFromResponse(fb, { mode, session, topicId: null }),
      topicId: null,
      label: null,
    };
  }

  let chosen = best;
  if (
    ranked.length > 1 &&
    best.topic.id === session.lastTopicId &&
    ranked[1].score > best.score * 0.72
  ) {
    chosen = ranked[1];
  }

  const response = pick(chosen.topic.responses, session.used, chosen.topic.id);
  session.lastTopicId = chosen.topic.id;
  if (!session.problem) session.problem = chosen.topic.label;

  return {
    blocks: composeFromResponse(response, { mode, session, topicId: chosen.topic.id }),
    topicId: chosen.topic.id,
    label: chosen.topic.label,
  };
}

export { brain };
