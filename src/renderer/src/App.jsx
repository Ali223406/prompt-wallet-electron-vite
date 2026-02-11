import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";

import DarkModeToggleLayout from "./components/DarkModeToggleLayout";
import NavMenuLayout from "./components/NavMenuLayout";
import Dashboard from "./pages/Dashboard";
import PromptCreate from "./pages/PromptCreate";
import PromptEdit from "./pages/PromptEdit";

import PromptUsePage from "./pages/PromptUsePage";
import About from "./pages/About";
import CGU from "./pages/CGU";

function App() {
  const [prompts, setPrompts] = useState(null); // null = pas encore chargé

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("my_prompts") || "[]");
    setPrompts(saved);
  }, []);

  useEffect(() => {
    if (prompts) localStorage.setItem("my_prompts", JSON.stringify(prompts));
  }, [prompts]);

  // Tant que prompts pas encore chargé
  if (prompts === null) return <div className="p-4 text-center">Loading...</div>;

  return (
    <HashRouter>
      <NavigationListener />
      <Routes>
        <Route element={<DarkModeToggleLayout />}>
          <Route element={<NavMenuLayout />}>
            <Route path="/" element={<Dashboard prompts={prompts} setPrompts={setPrompts} />} />
            <Route path="/new-prompt" element={<PromptCreate prompts={prompts} setPrompts={setPrompts} />} />
            <Route path="/edit/:id" element={<PromptEdit prompts={prompts} setPrompts={setPrompts} />} />
            <Route path="/use/:id" element={<PromptUsePage prompts={prompts} />} />
            <Route path="/about" element={<About />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="*" element={<div className="p-4 text-center">404 Not Found</div>} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

// Component to handle Electron menu navigation
function NavigationListener() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.electronAPI?.onNavigate) {
      window.electronAPI.onNavigate((path) => {
        navigate(path);
      });
    }
  }, [navigate]);

  return null;
}

export default App;
