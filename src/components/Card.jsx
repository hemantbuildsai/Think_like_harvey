import "./Card.css";

export default function Card({
  as: Tag = "div",
  pad = "md",
  hover = false,
  accent = false,
  glow = null,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "card",
    pad !== "md" && `card--pad-${pad}`,
    hover && "card--hover",
    accent && "card--accent",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...rest}>
      {glow ? (
        <span
          className="card__glow"
          style={{ background: glow.color, top: glow.top ?? "-40%", left: glow.left ?? "-10%" }}
          aria-hidden="true"
        />
      ) : null}
      {children}
    </Tag>
  );
}
