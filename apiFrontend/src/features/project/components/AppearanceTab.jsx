import {useEffect, useState} from "react";
import api from "../../../services/api";

const AppearanceTab = () => {
  const [currentTheme, setCurrentTheme] = useState("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setCurrentTheme(savedTheme);
  }, []);

  const changeTheme = async (theme) => {
    try {
      await api.put("/settings/theme", {theme});
    } catch (error) {
      console.error("Failed to save theme:", error);
    }

    localStorage.setItem("theme", theme);
    setCurrentTheme(theme);

    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      document.documentElement.classList.toggle("dark", prefersDark);
      document.documentElement.style.colorScheme = prefersDark
        ? "dark"
        : "light";
    }

    window.dispatchEvent(new CustomEvent("themechange", {detail: {theme}}));
  };

  const cardClass = (theme) => `
    rounded-lg p-4 border transition-all duration-200
    flex flex-col items-center gap-2
    bg-white dark:bg-[#140A1F]
    border-slate-200 dark:border-purple-900/30
    hover:border-purple-600 dark:hover:border-purple-500
    ${currentTheme === theme ? "ring-2 ring-purple-600 border-purple-600" : ""}
  `;

  return (
    <div className="max-w-xl">
      <div className="bg-white dark:bg-[#0B0513] border border-slate-200 dark:border-purple-900/30 rounded-xl p-6 space-y-6 shadow-sm dark:shadow-none">
        <h2 className="text-lg font-semibold text-purple-600 dark:text-purple-400">
          Appearance
        </h2>

        <p className="text-sm text-slate-600 dark:text-gray-400">
          Customize how AUTO API looks on your device.
        </p>

        <div className="grid grid-cols-3 gap-4">
          {/* Dark Theme */}
          <button
            onClick={() => changeTheme("dark")}
            className={cardClass("dark")}
          >
            <div className="w-10 h-6 rounded bg-black border border-gray-700" />
            <span className="text-sm text-slate-700 dark:text-gray-300">
              Dark
            </span>
          </button>

          {/* Light Theme */}
          <button
            onClick={() => changeTheme("light")}
            className={cardClass("light")}
          >
            <div className="w-10 h-6 rounded bg-gray-200 border border-gray-300" />
            <span className="text-sm text-slate-700 dark:text-gray-300">
              Light
            </span>
          </button>

          {/* System Theme */}
          <button
            onClick={() => changeTheme("system")}
            className={cardClass("system")}
          >
            <div className="w-10 h-6 rounded bg-gradient-to-r from-black to-gray-200 border border-gray-400" />
            <span className="text-sm text-slate-700 dark:text-gray-300">
              System
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
