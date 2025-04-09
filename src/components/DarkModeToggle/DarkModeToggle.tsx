import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "../Icons/Icons";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("darkMode") === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="bg-gray-200 dark:bg-gray-700 rounded-full w-12 h-6 flex items-center justify-center transition duration-200"
    >
      {darkMode ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default DarkModeToggle;
