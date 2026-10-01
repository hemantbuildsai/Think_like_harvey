import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Sheet.css";

export default function Sheet({ open, onClose, title, subtitle, children, width }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <>
      <div className="sheet__scrim" onClick={onClose} />
      <div className="sheet" role="dialog" aria-modal="true" style={width ? { width } : undefined}>
        <header className="sheet__head">
          <div>
            <h3 className="sheet__title">{title}</h3>
            {subtitle ? <p className="sheet__sub">{subtitle}</p> : null}
          </div>
          <button className="sheet__close" onClick={onClose} aria-label="Close" type="button">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>
        <div className="sheet__body">{children}</div>
      </div>
    </>,
    document.body,
  );
}
