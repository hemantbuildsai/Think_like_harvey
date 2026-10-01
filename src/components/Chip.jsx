import "./Chip.css";

export default function Chip({
  tone = "",
  active = false,
  swatch = null,
  as,
  className = "",
  children,
  ...rest
}) {
  const Tag = as || (rest.onClick ? "button" : "span");
  const classes = [
    "chip",
    tone && `chip--${tone}`,
    Tag === "button" && "chip--button",
    active && "is-active",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...(Tag === "button" ? { type: "button" } : {})} {...rest}>
      {swatch ? <span className="chip__swatch" style={{ background: swatch }} /> : null}
      {children}
    </Tag>
  );
}
