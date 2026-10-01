import { useCallback, useEffect, useState } from "react";

function currentRoute() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [path, ...rest] = raw.split("/");
  return { path: path || "home", param: rest.join("/") || null, raw };
}

export default function useHashRoute() {
  const [route, setRoute] = useState(currentRoute);

  useEffect(() => {
    const onChange = () => {
      setRoute(currentRoute());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = useCallback((to) => {
    const next = to.startsWith("#") ? to : `#/${to.replace(/^\//, "")}`;
    if (window.location.hash === next) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = next;
  }, []);

  return { ...route, navigate };
}
