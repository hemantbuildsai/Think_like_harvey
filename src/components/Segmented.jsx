import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./Segmented.css";

export default function Segmented({ options, value, onChange, block = false, className = "" }) {
  const wrapRef = useRef(null);
  const itemRefs = useRef({});
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });

  const measure = () => {
    const el = itemRefs.current[value];
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  };

  useLayoutEffect(measure, [value, options]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  return (
    <div
      ref={wrapRef}
      className={["seg", block && "seg--block", className].filter(Boolean).join(" ")}
      role="tablist"
    >
      <span
        className="seg__pill"
        aria-hidden="true"
        style={{
          left: pill.left,
          width: pill.width,
          opacity: pill.ready ? 1 : 0,
        }}
      />
      {options.map((opt) => {
        const key = typeof opt === "string" ? opt : opt.value;
        const label = typeof opt === "string" ? opt : opt.label;
        return (
          <button
            key={key}
            ref={(node) => {
              itemRefs.current[key] = node;
            }}
            role="tab"
            aria-selected={value === key}
            className={["seg__item", value === key && "is-active"].filter(Boolean).join(" ")}
            onClick={() => onChange(key)}
            type="button"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
