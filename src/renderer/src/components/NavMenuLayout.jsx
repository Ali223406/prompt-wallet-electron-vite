import React, { useEffect, useCallback } from "react";   // Import React and necessary hooks from the React library. useEffect is used for side effects, and useCallback is used to memoize the keyboard event handler function to prevent unnecessary re-renders.
import { Outlet, useOutletContext, useNavigate } from "react-router-dom"; // Import components and hooks from react-router-dom. Outlet is used to render child routes, useOutletContext is used to access context passed from parent routes, and useNavigate is used to programmatically navigate between routes.
import NavMenu from "./NavMenu";  // Import the NavMenu component, which is likely a navigation menu that will be displayed on this layout. The NavMenu component is responsible for rendering the navigation links and handling user interactions with the menu.
import './NavMenu.css';              // Import the CSS file for styling the NavMenu component. This allows us to apply custom styles to the navigation menu and ensure it looks consistent across the application.

const NavMenuLayout = () => {           // The NavMenuLayout component is a layout component that wraps around the main content of the application. It includes the NavMenu component for navigation and uses the Outlet component to render the child routes. It also listens for keyboard shortcuts to navigate between pages (Dashboard and New Prompt) using Ctrl+Alt+L and Ctrl+Alt+N (or Cmd+Alt+L and Cmd+Alt+N on Mac).
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

