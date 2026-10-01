import { Suspense, lazy, useEffect } from "react";
import NavBar from "./components/NavBar";
import useHashRoute from "./hooks/useHashRoute";
import useLocalStorage from "./hooks/useLocalStorage";
import Home from "./features/home/Home";
import "./App.css";

// The three modules carry all the long-form content, so they are split out of the
// initial bundle and fetched the first time their route is opened.
const MindsetIndex = lazy(() => import("./features/mindset/MindsetIndex"));
const ChapterReader = lazy(() => import("./features/mindset/ChapterReader"));
const Wardrobe = lazy(() => import("./features/wardrobe/Wardrobe"));
const Chat = lazy(() => import("./features/chat/Chat"));

function Loading() {
  return (
    <div className="app__loading" role="status" aria-live="polite">
      <span className="app__loadingDot" />
      <span className="app__loadingDot" />
      <span className="app__loadingDot" />
      <span className="app__loadingText">Loading</span>
    </div>
  );
}

export default function App() {
  const { path, param, navigate } = useHashRoute();
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  let view;
  if (path === "doctrine") {
    view = param ? (
      <ChapterReader id={param} navigate={navigate} />
    ) : (
      <MindsetIndex navigate={navigate} />
    );
  } else if (path === "closet") {
    view = <Wardrobe />;
  } else if (path === "office") {
    view = <Chat />;
  } else {
    view = <Home navigate={navigate} />;
  }

  return (
    <div className="app">
      <NavBar
        route={path}
        navigate={navigate}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />
      <main className="app__main">
        <div className="shell">
          <div key={path + (param || "")} className="page">
            <Suspense fallback={<Loading />}>{view}</Suspense>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="shell footer__inner">
          <span>Specter &mdash; a training studio for mindset, presence and dress.</span>
          <span>
            An original fan-made study aid inspired by the character. Not affiliated with Suits or
            its rights holders.
          </span>
        </div>
      </footer>
    </div>
  );
}
