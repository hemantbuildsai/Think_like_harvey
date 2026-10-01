import Card from "../../components/Card";
import Chip from "../../components/Chip";
import ScoreDial from "../../components/ScoreDial";
import { ProgressBar } from "../../components/ProgressBar";
import { nextPurchase } from "../../engine/outfitScore";

const toneColour = (tone) => {
  if (tone === "good") return "var(--good)";
  if (tone === "warn") return "var(--warn)";
  if (tone === "bad") return "var(--bad)";
  return "var(--accent)";
};

const pctTone = (pct) => (pct >= 0.85 ? "good" : pct >= 0.5 ? "warn" : "bad");

export default function Verdict({ result, closet }) {
  const purchase = nextPurchase(closet, result);

  if (!result?.complete) {
    return (
      <div className="wd-verdict-full">
        <Card pad="lg" className="wd-empty">
          <p className="wd-verdict serif">{result?.verdict || "Build the outfit first."}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="wd-verdict-full">
      <header className="wd-verdict-head">
        <ScoreDial score={result.score} label={result.grade} size={132} stroke={10} />
        <div>
          <span className="eyebrow">{result.band}</span>
          <h2>{result.score}/100 · {result.grade}</h2>
          <p className="wd-verdict serif">{result.verdict}</p>
        </div>
      </header>

      <div className="wd-dimensions">
        {result.dimensions.map((dim) => (
          <Card pad="md" className="wd-dimension" key={dim.id}>
            <div className="wd-dimension__head">
              <div>
                <h3>{dim.label}</h3>
                <p>{dim.blurb}</p>
              </div>
              <Chip>{dim.weight} pts</Chip>
            </div>
            <ProgressBar
              label={`${Math.round(dim.points * 10) / 10} earned`}
              value={dim.pct * 100}
              hint={`${Math.round(dim.pct * 100)}%`}
              colour={toneColour(pctTone(dim.pct))}
            />
            <div className="wd-checks">
              {dim.checks.map((check) => (
                <div className={`wd-check wd-check--${check.tone}`} key={check.id}>
                  <div>
                    <strong>{check.label}</strong>
                    <p>{check.note}</p>
                  </div>
                  <span>{Math.round(check.earned * 10) / 10}/{check.max}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {result.hardFails.length ? (
        <Card pad="md" className="wd-hardfail wd-hardfail--full">
          <span className="eyebrow">Hard failures</span>
          {result.hardFails.map((fail) => (
            <div className="wd-hardfail__item" key={fail.id}>
              <strong>{fail.label} · cap {fail.cap}</strong>
              <p>{fail.detail}</p>
            </div>
          ))}
        </Card>
      ) : null}

      <Card pad="md" className="wd-fixes-full">
        <span className="eyebrow">Ranked fixes</span>
        {result.fixes.length ? (
          <ol>
            {result.fixes.map((fix) => (
              <li key={fix.id}>
                <span>+{fix.gain}</span>
                <div>
                  <strong>{fix.label}</strong>
                  <p>{fix.dimension} · {fix.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="muted">Nothing material to fix.</p>
        )}
      </Card>

      <Card pad="md" accent className="wd-purchase">
        <span className="eyebrow">Next purchase</span>
        <h3>{purchase.item}</h3>
        <p>{purchase.why}</p>
        <Chip>Cost: {purchase.cost}</Chip>
      </Card>
    </div>
  );
}
