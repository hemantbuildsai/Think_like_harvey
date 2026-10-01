import "./ProgressBar.css";

export function ProgressBar({ label, value, max = 100, hint, colour = "var(--accent)" }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div className="bar">
      {(label || hint) && (
        <div className="bar__head">
          {label ? <span className="bar__label">{label}</span> : <span />}
          {hint ? <span className="bar__val">{hint}</span> : null}
        </div>
      )}
      <div className="bar__track">
        <div className="bar__fill" style={{ width: `${pct}%`, color: colour }} />
      </div>
    </div>
  );
}

export function ProgressRing({ value = 0, size = 40, stroke = 3.5 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, value)) / 100) * c;
  return (
    <svg className="ring" width={size} height={size} aria-hidden="true">
      <circle className="ring__track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} />
      <circle
        className="ring__value"
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
      />
    </svg>
  );
}

export default ProgressBar;
