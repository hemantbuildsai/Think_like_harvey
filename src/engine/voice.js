const TERMINAL = /[.!?…]["')\]]?$/;
const SOFT_END = /[,;:—-]$/;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function tidyBlock(block) {
  const text = String(block || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";
  return TERMINAL.test(text) ? text : `${text}.`;
}

function shouldMerge(current, next) {
  if (!current || !next) return false;
  const raw = String(current).trim();
  if (raw.length >= 35) return false;
  return SOFT_END.test(raw) || !TERMINAL.test(raw);
}

export function shapeBlocks(blocks, { style } = {}) {
  const warmth = Number(style?.warmth ?? 0.5);
  const source = Array.isArray(blocks) ? blocks : [blocks];
  const clean = source
    .map((block) => String(block || "").replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const shaped = [];
  for (let i = 0; i < clean.length; i += 1) {
    const block = clean[i];
    const next = clean[i + 1];
    if (shouldMerge(block, next) && (warmth > 0.25 || block.length < 22)) {
      shaped.push(tidyBlock(`${block} ${next}`));
      i += 1;
    } else {
      shaped.push(tidyBlock(block));
    }
  }

  return shaped;
}

export function splitTokens(text) {
  return String(text || "").match(/\S+\s*/g) || [];
}

export function typingDelay(token, { pace = 1 } = {}) {
  const text = String(token || "");
  const word = text.trim();
  if (!word) return 18;

  // Cadence follows speech: words move quickly, commas breathe, full stops land.
  let delay = 22 + Math.max(0, word.length - 7) * 3;
  if (/\n\s*\n/.test(text)) delay += 380;
  else if (/[.!?…]["')\]]?\s*$/.test(text)) delay += 260;
  else if (/[,;:]["')\]]?\s*$/.test(text)) delay += 90;

  return Math.round(clamp(delay * Number(pace || 1), 14, 520));
}

export function thinkingTime(text, style = {}) {
  const input = String(text || "");
  const bluntness = Number(style?.bluntness ?? 0.5);
  const tactical = Number(style?.tactical ?? 0.5);
  const lengthCost = Math.min(460, input.length * 2.6);
  const styleShift = tactical * 70 - bluntness * 170;
  return Math.round(clamp(520 + lengthCost + styleShift, 450, 1100));
}

export function estimateReadTime(blocks) {
  const text = (Array.isArray(blocks) ? blocks : [blocks]).join(" ");
  const words = (text.match(/\S+/g) || []).length;
  return Math.max(1, Math.ceil(words / 220));
}

export default { shapeBlocks, splitTokens, typingDelay, thinkingTime, estimateReadTime };
