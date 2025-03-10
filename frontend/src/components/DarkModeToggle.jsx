import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false); // Start as false

  useEffect(() => {
    // Read from localStorage when component mounts
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newTheme = !prev ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return !prev;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-lg bg-gray-200 dark:bg-gray-800 transition-all"
    >
      {darkMode ? (
        <FiSun className="text-yellow-400 text-xl" />
      ) : (
        <FiMoon className="text-gray-900 dark:text-white text-xl" />
      )}
    </button>
  );
};

export default DarkModeToggle;
