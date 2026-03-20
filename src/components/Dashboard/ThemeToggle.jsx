// src/components/Dasboard/ThemeToggle.jsx
import { Sun, Moon } from "lucide-react";
import { useUIStore } from "../../store/useUIStore";

const ThemeToggle = () => {
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300
        ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
    >
      {/* Left Icon (Light) */}
      <Moon
        className={`absolute left-2 w-4 h-4 transition-opacity duration-300 
          ${theme === "dark" ? "opacity-100" : "opacity-30"}`}
      />
      
      {/* Right Icon (Dark) */}
      <Sun
        className={`absolute right-2 w-4 h-4 transition-opacity duration-300 
          ${theme === "dark" ? "opacity-30" : "opacity-100"}`}
      />
      
      {/* Toggle circle */}
      <div
        className={`absolute top-1 w-6 h-6 bg-white bg-opacity-50 rounded-full flex items-center justify-center
          transform transition-transform duration-300 ease-in-out
          ${theme === "dark" ? "translate-x-8" : "translate-x-0"}
          shadow-md hover:shadow-[0_0_10px_2px_${
            theme === "dark" ? "rgba(96,165,250,0.6)" : "rgba(253,230,138,0.6)"
          }]`}
      >
        {theme === "dark" ? (
          <Sun className="text-yellow-400 w-4 h-4" />
        ) : (
          <Moon className="text-gray-700 w-4 h-4" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;