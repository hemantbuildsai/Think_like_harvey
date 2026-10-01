const paths = {
  brain: "M12 3a3 3 0 00-3 3 3 3 0 00-2 5.2A3 3 0 008 17a3 3 0 004 1.8A3 3 0 0016 17a3 3 0 001-5.8A3 3 0 0015 6a3 3 0 00-3-3zM12 3v16",
  hanger: "M12 4a2 2 0 012 2c0 1.2-1 1.6-2 2v2m0 0L4 15c-1 .6-1 2 .3 2h15.4c1.3 0 1.3-1.4.3-2l-8-5z",
  chat: "M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v8a2.5 2.5 0 01-2.5 2.5H10l-4.4 3.6A.6.6 0 014.6 19l.2-3H4.5A2.5 2.5 0 014 13.5z",
  arrow: "M5 12h13m0 0l-5.5-5.5M18 12l-5.5 5.5",
  back: "M19 12H6m0 0l5.5-5.5M6 12l5.5 5.5",
  check: "M4.5 12.5l5 5 10-11",
  spark: "M12 3l1.8 5.4L19 10.2l-5.2 1.8L12 17.4l-1.8-5.4L5 10.2l5.2-1.8z",
  book: "M4 5.2A2.2 2.2 0 016.2 3H19v15H6.2A2.2 2.2 0 004 20.2zM4 20.2A2.2 2.2 0 016.2 18H19v3H6.2A2.2 2.2 0 014 18.8z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  send: "M4 12l16-8-6 8 6 8z",
  target: "M12 3v3m0 12v3M3 12h3m12 0h3M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z",
  shield: "M12 3l7 3v5.5c0 4-2.9 7.5-7 9.5-4.1-2-7-5.5-7-9.5V6z",
  bolt: "M13.5 3L6 13.5h5L10.5 21 18 10.5h-5z",
  sun: "M12 5.5v-2m0 17v-2M5.5 12h-2m17 0h-2M7.4 7.4L6 6m12 12l-1.4-1.4M7.4 16.6L6 18M18 6l-1.4 1.4M12 8.4a3.6 3.6 0 100 7.2 3.6 3.6 0 000-7.2z",
  moon: "M20 14.3A8.2 8.2 0 019.7 4 8.2 8.2 0 1020 14.3z",
  trash: "M4.5 6.5h15M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7M6.5 6.5l.8 12.2c0 .9.8 1.6 1.7 1.6h6c.9 0 1.7-.7 1.7-1.6l.8-12.2",
  scale: "M12 4v16M7 20h10M5 8h14M5 8l-2.5 6a3 3 0 005 0zM19 8l-2.5 6a3 3 0 005 0z",
};

export default function Icon({ name, size = 20, stroke = 1.6, className = "", ...rest }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      <path d={d} />
    </svg>
  );
}
