import { useMemo, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Chip from "../../components/Chip";
import Icon from "../../components/Icon";
import ScoreDial from "../../components/ScoreDial";
import Segmented from "../../components/Segmented";
import Sheet from "../../components/Sheet";
import { ProgressBar } from "../../components/ProgressBar";
import { CONTEXTS, SLOTS, getItem, swatchOf } from "../../data/garments";
import { FIT_CHECKS, DEFAULT_FIT } from "../../data/styleRules";
import { bestOutfit } from "../../engine/outfitScore";
import Verdict from "./Verdict";

const toneColour = (tone) => {
  if (tone === "good") return "var(--good)";
  if (tone === "warn") return "var(--warn)";
  if (tone === "bad") return "var(--bad)";
  return "var(--accent)";
};

const pctTone = (pct) => (pct >= 0.85 ? "good" : pct >= 0.5 ? "warn" : "bad");

function emptyItems() {
  return SLOTS.reduce((acc, slot) => {
    acc[slot.id] = null;
    return acc;
  }, {});
}

export default function OutfitBuilder({ closet, outfit, setOutfit, result, onGoCloset }) {
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const ownedBySlot = useMemo(() => {
    const owned = closet.map(getItem).filter(Boolean);
    return SLOTS.reduce((acc, slot) => {
      acc[slot.id] = owned.filter((item) => item.slot === slot.id);
      return acc;
    }, {});
  }, [closet]);

  const fit = { ...DEFAULT_FIT, ...(outfit?.fit || {}) };
  const items = { ...emptyItems(), ...(outfit?.items || {}) };
  const context = CONTEXTS.find((ctx) => ctx.id === outfit?.context) || CONTEXTS[0];

  const updateItem = (slotId, itemId) => {
    setOutfit((current) => ({
      ...current,
      items: { ...emptyItems(), ...(current?.items || {}), [slotId]: itemId },
      fit: { ...DEFAULT_FIT, ...(current?.fit || {}) },
      context: current?.context || context.id,
    }));
  };

  const updateFit = (checkId, value) => {
    setOutfit((current) => ({
      ...current,
      items: { ...emptyItems(), ...(current?.items || {}) },
      fit: { ...DEFAULT_FIT, ...(current?.fit || {}), [checkId]: Number(value) },
      context: current?.context || context.id,
    }));
  };

  const updateContext = (contextId) => {
    setOutfit((current) => ({
      ...current,
      items: { ...emptyItems(), ...(current?.items || {}) },
      fit: { ...DEFAULT_FIT, ...(current?.fit || {}) },
      context: contextId,
    }));
  };

  const applyBest = () => {
    const best = bestOutfit(closet, { fit, context: context.id });
    setOutfit((current) => ({
      ...current,
      items: { ...emptyItems(), ...best.items },
      fit,
      context: context.id,
    }));
  };

  const clearOutfit = () => {
    setOutfit((current) => ({
      ...current,
      items: emptyItems(),
      fit: { ...DEFAULT_FIT, ...(current?.fit || {}) },
      context: current?.context || context.id,
    }));
  };

  return (
    <div className="wd-builder rise">
      <div className="wd-builder__main">
        <Card pad="md" className="wd-context">
          <div className="wd-section-title">
            <span className="eyebrow">Room</span>
            <h2>Dress for the argument you intend to win.</h2>
          </div>
          <div className="wd-chip-row">
            {CONTEXTS.map((ctx) => (
              <Chip key={ctx.id} active={ctx.id === context.id} onClick={() => updateContext(ctx.id)}>
                {ctx.label}
              </Chip>
            ))}
          </div>
          <p>{context.blurb}</p>
        </Card>

        <div className="wd-slot-list">
          {SLOTS.map((slot) => {
            const options = ownedBySlot[slot.id] || [];
            const selected = getItem(items[slot.id]);
            const missingRequired = slot.required && !selected;
            return (
              <Card
                pad="md"
                className={["wd-slot", missingRequired && "wd-is-missing"].filter(Boolean).join(" ")}
                key={slot.id}
              >
                <header className="wd-slot__head">
                  <div className="wd-slot__label">
                    <Icon name={slot.icon} size={18} />
                    <div>
                      <h3>{slot.label}</h3>
                      <p>{slot.hint}</p>
                    </div>
                  </div>
                  {selected ? (
                    <Chip swatch={swatchOf(selected)}>{selected.label}</Chip>
                  ) : (
                    <Chip tone={missingRequired ? "bad" : ""}>{slot.required ? "Required" : "Optional"}</Chip>
                  )}
                </header>

                {selected ? <p className="wd-selected muted">{selected.sub}</p> : null}

                {options.length ? (
                  <div className="wd-strip" role="list" aria-label={`${slot.label} choices`}>
                    {!slot.required ? (
                      <button
                        type="button"
                        className={["wd-choice", !selected && "wd-is-active"].filter(Boolean).join(" ")}
                        onClick={() => updateItem(slot.id, null)}
                      >
                        None
                      </button>
                    ) : null}
                    {options.map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        className={["wd-choice", selected?.id === item.id && "wd-is-active"].filter(Boolean).join(" ")}
                        onClick={() => updateItem(slot.id, item.id)}
                      >
                        <span className="wd-swatch" style={{ background: swatchOf(item) }} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="wd-empty wd-empty--inline">
                    <span>No {slot.label.toLowerCase()} in your closet.</span>
                    <Button variant="ghost" size="sm" onClick={onGoCloset}>Add in Closet</Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <Card pad="lg" className="wd-fit">
          <div className="wd-section-title">
            <span className="eyebrow">Fit check</span>
            <h2>The cloth either obeys you or betrays you.</h2>
          </div>
          <div className="wd-fit__grid">
            {FIT_CHECKS.map((check) => {
              const selected = check.options.find((option) => option.value === fit[check.id]) || check.options[1];
              return (
                <div className="wd-fit-check" key={check.id}>
                  <span className="wd-fit-check__label">{check.label}</span>
                  <p>{check.question}</p>
                  <Segmented
                    options={check.options.map((option) => ({ value: option.value, label: option.label }))}
                    value={selected.value}
                    onChange={(value) => updateFit(check.id, value)}
                    block
                  />
                  <span className="wd-note">{selected.note}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <aside className="wd-score-panel">
        <Card pad="lg" accent={result.complete} className="wd-score-card">
          <div className="wd-actions wd-actions--spread">
            <Button variant="primary" size="sm" onClick={applyBest} disabled={!closet.length}>Best from my closet</Button>
            <Button variant="ghost" size="sm" onClick={clearOutfit}>Clear outfit</Button>
          </div>

          {!result.complete ? (
            <div className="wd-incomplete">
              <p className="wd-verdict serif">{result.verdict}</p>
              <div className="wd-missing">
                {result.missing.map((slotId) => {
                  const slot = SLOTS.find((entry) => entry.id === slotId);
                  return <Chip tone="bad" key={slotId}>{slot?.label || slotId}</Chip>;
                })}
              </div>
            </div>
          ) : (
            <>
              <div className="wd-score-top">
                <ScoreDial score={result.score} label={result.grade} size={154} stroke={12} />
                <p className="wd-verdict serif">{result.verdict}</p>
              </div>

              {result.hardFails.length ? (
                <div className="wd-hardfail">
                  <strong>Score capped at {result.cap}</strong>
                  <ul>
                    {result.hardFails.map((fail) => <li key={fail.id}>{fail.label}</li>)}
                  </ul>
                </div>
              ) : null}

              <div className="wd-bars">
                {result.dimensions.map((dim) => (
                  <ProgressBar
                    key={dim.id}
                    label={dim.label}
                    value={dim.pct * 100}
                    hint={`${Math.round(dim.pct * 100)}%`}
                    colour={toneColour(pctTone(dim.pct))}
                  />
                ))}
              </div>

              <div className="wd-fixes-mini">
                <span className="eyebrow">Top fixes</span>
                {result.fixes.slice(0, 3).length ? result.fixes.slice(0, 3).map((fix) => (
                  <div className="wd-fix" key={fix.id}>
                    <strong>{fix.label}</strong>
                    <span>+{fix.gain} pts · {fix.dimension}</span>
                  </div>
                )) : <p className="muted">No obvious leaks. Keep the standard.</p>}
              </div>

              <Button variant="outline" block onClick={() => setBreakdownOpen(true)}>Full breakdown</Button>
            </>
          )}
        </Card>
      </aside>

      <Sheet
        open={breakdownOpen}
        onClose={() => setBreakdownOpen(false)}
        title="Full wardrobe verdict"
        subtitle="Every point, every penalty, no polite fiction."
        width="min(920px, calc(100vw - 32px))"
      >
        <Verdict result={result} closet={closet} />
      </Sheet>
    </div>
  );
}
