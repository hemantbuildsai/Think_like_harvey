import { useEffect, useState } from "react";
import Icon from "./Icon";
import "./NavBar.css";

const LINKS = [
  { path: "doctrine", label: "Doctrine" },
  { path: "closet", label: "Closet" },
  { path: "office", label: "The Office" },
];

export default function NavBar({ route, navigate, theme, onToggleTheme }) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={["nav", stuck && "is-stuck"].filter(Boolean).join(" ")}>
      <div className="nav__inner">
        <button className="nav__brand" onClick={() => navigate("home")} type="button">
          <span className="nav__mark">HS</span>
          <span>Specter</span>
        </button>

        <div className="nav__links">
          {LINKS.map((l) => (
            <button
              key={l.path}
              type="button"
              className={["nav__link", route === l.path && "is-active"].filter(Boolean).join(" ")}
              onClick={() => navigate(l.path)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          className="nav__theme"
          onClick={onToggleTheme}
          type="button"
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
        </button>
      </div>
    </nav>
  );
}
