import { useEffect, useState } from "react";
import "./ScoreDial.css";

function colourFor(score) {
  if (score >= 85) return "#35c07b";
  if (score >= 70) return "#c9a227";
  if (score >= 55) return "#e0a63c";
  return "#e0563c";
}

export default function ScoreDial({ score = 0, size = 168, stroke = 12, label = "" }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(score));
    return () => cancelAnimationFrame(id);
  }, [score]);

  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, shown)) / 100) * c;
  const colour = colourFor(score);

  return (
    <div className="dial" style={{ width: size, height: size }}>
      <svg className="dial__svg" width={size} height={size}>
        <circle className="dial__track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} />
        <circle
          className="dial__value"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          stroke={colour}
          color={colour}
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="dial__center">
        <span className="dial__num" style={{ fontSize: size * 0.3, color: colour }}>
          {Math.round(score)}
        </span>
        {label ? <span className="dial__grade">{label}</span> : null}
      </div>
    </div>
  );
}
