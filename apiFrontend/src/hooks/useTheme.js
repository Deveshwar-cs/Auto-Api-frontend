import {useEffect, useState} from "react";

const useTheme = () => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") !== "light",
  );

  useEffect(() => {
    const update = () => setIsDark(localStorage.getItem("theme") !== "light");
    window.addEventListener("themechange", update);
    return () => window.removeEventListener("themechange", update);
  }, []);

  return isDark;
};

export default useTheme;
