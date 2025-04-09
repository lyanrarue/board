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
      className="rounded-full w-6 h-6 flex items-center justify-center transition duration-400 hover:bg-gray-100 dark:hover:bg-gray-900"
    >
      {darkMode ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default DarkModeToggle;
