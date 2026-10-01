import { useEffect, useMemo, useState } from "react";
import Segmented from "../../components/Segmented";
import useLocalStorage from "../../hooks/useLocalStorage";
import { SLOTS, STARTER_CLOSET } from "../../data/garments";
import { DEFAULT_FIT } from "../../data/styleRules";
import { scoreOutfit } from "../../engine/outfitScore";
import Closet from "./Closet";
import OutfitBuilder from "./OutfitBuilder";
import "./wardrobe.css";

const EMPTY_ITEMS = SLOTS.reduce((acc, slot) => {
  acc[slot.id] = null;
  return acc;
}, {});

const DEFAULT_OUTFIT = {
  items: EMPTY_ITEMS,
  fit: DEFAULT_FIT,
  context: "boardroom",
};

export default function Wardrobe() {
  const [view, setView] = useState("closet");
  const [closet, setCloset] = useLocalStorage("closet", STARTER_CLOSET);
  const [outfit, setOutfit] = useLocalStorage("outfit", DEFAULT_OUTFIT);

  useEffect(() => {
    const owned = new Set(Array.isArray(closet) ? closet : []);
    setOutfit((current) => {
      const currentItems = current?.items || {};
      const nextItems = {};
      let changed = false;

      SLOTS.forEach((slot) => {
        const selected = currentItems[slot.id] || null;
        nextItems[slot.id] = selected && owned.has(selected) ? selected : null;
        if (nextItems[slot.id] !== selected || !(slot.id in currentItems)) changed = true;
      });

      const nextFit = { ...DEFAULT_FIT, ...(current?.fit || {}) };
      const nextContext = current?.context || "boardroom";
      if (!changed && current?.fit && current?.context && current?.items) return current;
      return { items: nextItems, fit: nextFit, context: nextContext };
    });
  }, [closet, setOutfit]);

  const result = useMemo(() => scoreOutfit(outfit), [outfit]);

  const safeCloset = Array.isArray(closet) ? closet : [];

  return (
    <section className="page wd-page">
      <header className="page__head wd-head">
        <span className="eyebrow">The Closet</span>
        <h1 className="page__title">Specter-level wardrobe audit.</h1>
        <p className="page__lede">
          Tell me what is in your closet. I will tell you what earns the room, what loses it,
          and what to buy next.
        </p>
      </header>

      <div className="wd-tabs">
        <Segmented
          options={[
            { value: "closet", label: "Closet" },
            { value: "outfit", label: "Outfit" },
          ]}
          value={view}
          onChange={setView}
          block
        />
      </div>

      {view === "closet" ? (
        <Closet closet={safeCloset} setCloset={setCloset} result={result} />
      ) : (
        <OutfitBuilder
          closet={safeCloset}
          outfit={outfit}
          setOutfit={setOutfit}
          result={result}
          onGoCloset={() => setView("closet")}
        />
      )}
    </section>
  );
}
