//src/components/ThemeSync.jsx
import { useEffect } from "react";
import { useUIStore } from "../store/useUIStore";

export default function ThemeSync() {
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return null;
}