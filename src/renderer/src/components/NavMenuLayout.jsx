import React, { useEffect, useCallback } from "react";
import { Outlet, useOutletContext, useNavigate } from "react-router-dom";
import NavMenu from "./NavMenu";
import './NavMenu.css';

const NavMenuLayout = () => {
  const context = useOutletContext() || {};
  const { isDarkMode = false } = context;
  const navigate = useNavigate();

  // Keyboard shortcuts with useCallback to avoid stale closures
  const handleKeyDown = useCallback((e) => {
    const key = e.key.toLowerCase();

    // Ctrl+Alt+L or Cmd+Alt+L → Dashboard
    if ((e.ctrlKey || e.metaKey) && e.altKey && key === 'l') {
      console.log('Ctrl+Alt+L pressed - navigating to Dashboard');
      e.preventDefault();
      navigate('/');
      return;
    }

    // Ctrl+Alt+N or Cmd+Alt+N → New Prompt
    if ((e.ctrlKey || e.metaKey) && e.altKey && key === 'n') {
      console.log('Ctrl+Alt+N pressed - navigating to New Prompt');
      e.preventDefault();
      navigate('/new-prompt');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, true); // Use capture phase
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <NavMenu isDarkMode={isDarkMode} />

      <main className="flex-1 p-4">
        <Outlet context={{ isDarkMode }} />
      </main>
    </div>
  );
};

export default NavMenuLayout;

