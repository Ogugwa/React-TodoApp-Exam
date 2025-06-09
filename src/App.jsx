import { useEffect, useState } from "react";
import React from "react";
import { LuSun, LuMoon } from "react-icons/lu";
import Default from "./components/default";
import { Route, Routes } from "react-router";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import ErrorPage from "./components/pages/errorPage";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode

  useEffect(() => {
    const isDark =
      localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <>
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-2 "
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <LuSun className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <LuMoon className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </button>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {/* <Default /> */}
    </>
  );
}

export default App;
