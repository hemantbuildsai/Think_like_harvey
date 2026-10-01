import { useMemo, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Chip from "../../components/Chip";
import Icon from "../../components/Icon";
import Segmented from "../../components/Segmented";
import Sheet from "../../components/Sheet";
import { SLOTS, STARTER_CLOSET, bySlot, catalog, swatchOf } from "../../data/garments";
import { nextPurchase } from "../../engine/outfitScore";

function matchesQuery(item, query) {
  if (!query) return true;
  const haystack = [item.label, item.sub, ...(item.tags || [])].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export default function Closet({ closet, setCloset, result }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [confirm, setConfirm] = useState(null);

  const owned = useMemo(() => new Set(closet), [closet]);
  const recommendation = useMemo(() => nextPurchase(closet, result?.complete ? result : null), [closet, result]);
  const coveredSlots = SLOTS.filter((slot) => closet.some((id) => catalog.find((item) => item.id === id)?.slot === slot.id));

  const visibleBySlot = useMemo(() => {
    return SLOTS.reduce((acc, slot) => {
      acc[slot.id] = bySlot(slot.id).filter((item) => {
        const isOwned = owned.has(item.id);
        if (filter === "owned" && !isOwned) return false;
        if (filter === "notOwned" && isOwned) return false;
        return matchesQuery(item, query);
      });
      return acc;
    }, {});
  }, [filter, owned, query]);

  const toggleOwned = (itemId) => {
    setCloset((current) => {
      const currentSet = new Set(Array.isArray(current) ? current : []);
      if (currentSet.has(itemId)) currentSet.delete(itemId);
      else currentSet.add(itemId);
      return catalog.filter((item) => currentSet.has(item.id)).map((item) => item.id);
    });
  };

  const runConfirm = () => {
    if (confirm === "reset") setCloset(STARTER_CLOSET);
    if (confirm === "empty") setCloset([]);
    setConfirm(null);
  };

  return (
    <div className="wd-closet rise">
      <div className="wd-summary">
        <Card pad="md" className="wd-stat">
          <span className="wd-stat__num">{closet.length}</span>
          <span className="wd-stat__label">items owned</span>
        </Card>
        <Card pad="md" className="wd-stat">
          <span className="wd-stat__num">{coveredSlots.length}/{SLOTS.length}</span>
          <span className="wd-stat__label">slots covered</span>
        </Card>
        <Card pad="md" accent className="wd-purchase">
          <span className="eyebrow">Next purchase</span>
          <h3>{recommendation.item}</h3>
          <p>{recommendation.why}</p>
          <Chip>Cost: {recommendation.cost}</Chip>
        </Card>
      </div>

      <Card pad="md" className="wd-toolbar">
        <label className="wd-search">
          <span className="muted">Search the rail</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try navy, Oxford, problem…"
          />
        </label>
        <Segmented
          options={[
            { value: "all", label: "All" },
            { value: "owned", label: "Owned" },
            { value: "notOwned", label: "Not owned" },
          ]}
          value={filter}
          onChange={setFilter}
        />
        <div className="wd-actions">
          <Button variant="outline" size="sm" onClick={() => setConfirm("reset")}>Reset starter</Button>
          <Button variant="ghost" size="sm" onClick={() => setConfirm("empty")}>Empty closet</Button>
        </div>
      </Card>

      <div className="wd-shelves">
        {SLOTS.map((slot) => {
          const items = visibleBySlot[slot.id] || [];
          const ownedCount = bySlot(slot.id).filter((item) => owned.has(item.id)).length;
          return (
            <section className="wd-shelf" key={slot.id}>
              <header className="wd-shelf__head">
                <div>
                  <span className="eyebrow">{slot.label}</span>
                  <p>{slot.hint}</p>
                </div>
                <Chip>{ownedCount} owned</Chip>
              </header>
              {items.length ? (
                <div className="wd-catalog-grid">
                  {items.map((item) => {
                    const isOwned = owned.has(item.id);
                    return (
                      <Card
                        as="button"
                        type="button"
                        hover
                        pad="sm"
                        accent={isOwned}
                        className={["wd-item", isOwned && "wd-is-owned"].filter(Boolean).join(" ")}
                        key={item.id}
                        onClick={() => toggleOwned(item.id)}
                        aria-pressed={isOwned}
                      >
                        <span className="wd-item__top">
                          <span className="wd-swatch" style={{ background: swatchOf(item) }} />
                          {isOwned ? <Icon name="check" size={16} /> : <span />}
                        </span>
                        <strong>{item.label}</strong>
                        <span className="muted">{item.sub}</span>
                        <span className="wd-formality" aria-label={`Formality ${item.formality} of 5`}>
                          <span style={{ width: `${Math.max(6, (item.formality / 5) * 100)}%` }} />
                        </span>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card pad="md" className="wd-empty">No pieces match this shelf.</Card>
              )}
            </section>
          );
        })}
      </div>

      <Sheet
        open={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        title={confirm === "reset" ? "Reset the closet?" : "Empty the closet?"}
        subtitle="This changes only your local Specter wardrobe."
      >
        <div className="wd-confirm">
          <p>
            {confirm === "reset"
              ? "Your current closet will be replaced with the starter set."
              : "Every owned item will be removed and any selected outfit pieces will be cleared."}
          </p>
          <div className="wd-actions wd-actions--end">
            <Button variant="ghost" onClick={() => setConfirm(null)}>Cancel</Button>
            <Button variant="primary" onClick={runConfirm}>{confirm === "reset" ? "Reset" : "Empty"}</Button>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
