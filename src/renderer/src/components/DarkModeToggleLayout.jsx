import React, { useState, useEffect } from 'react'; // Import React and useState, useEffect hooks for managing component state and side effects
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component for rendering icons from the Font Awesome library
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'; // Import specific icons (moon and sun) from the Font Awesome library to be used for the dark mode toggle button
import { Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom to render child routes within this layout component

const DarkModeToggleLayout = () => {  // The DarkModeToggleLayout component is a layout component that provides a dark mode toggle button for the application. It manages the state of whether dark mode is enabled or not, and applies the appropriate CSS classes to the document element to enable dark mode styling. The component also checks if it's running in an Electron environment and uses Electron's dark mode API to toggle dark mode if available. The Outlet component is used to render child routes within this layout, allowing the dark mode toggle functionality to be available across all pages that use this layout.
  const [isDarkMode, setIsDarkMode] = useState(false); // State to track whether dark mode is enabled or not
  const [isElectron, setIsElectron] = useState(false);          //

  useEffect(() => {
    if (window.darkMode?.toggle) setIsElectron(true); // Check if the Electron dark mode API is available, which indicates that the app is running in an Electron environment. If it is available, we set the isElectron state to true, allowing us to use the Electron API for toggling dark mode instead of just toggling a CSS class.

    // Load saved mode for browser
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    // Apply dark class immediately on mount
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // Apply dark class to html element for Tailwind
    if (isDarkMode) {
      document.documentElement.classList.add('dark'); // Add the 'dark' class to the document element when dark mode is enabled, allowing Tailwind CSS to apply dark mode styles to the application. This ensures that when users toggle dark mode on, the appropriate styles are applied throughout the app based on the presence of the 'dark' class.
    } else {
      document.documentElement.classList.remove('dark'); // Remove the 'dark' class from the document element when dark mode is disabled, ensuring that the application switches back to light mode styling. This allows users to toggle between light and dark themes seamlessly, with the appropriate styles applied based on their selection.
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const switchDarkMode = async () => {
    if (isElectron) {
      try {
        const newMode = await window.darkMode.toggle();
        setIsDarkMode(newMode);
      } catch (err) {
        console.error("Failed to toggle dark mode via Electron:", err); // If there's an error while toggling dark mode using the Electron API, we log the error to the console and fall back to toggling dark mode using the local state and CSS classes. This ensures that even if the Electron API fails for some reason, users can still toggle dark mode using the button.
      }
    } else {
      setIsDarkMode(prev => !prev);  // If not running in Electron, simply toggle the isDarkMode state, which will trigger the useEffect to add or remove the 'dark' class on the document element, enabling dark mode styling for the application. This allows users to switch between light and dark themes even when running the app in a regular web browser.
    }
  };

  return (
    <div>
      <button
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition shadow-lg hover:shadow-xl transform hover:scale-110"
        onClick={switchDarkMode}
        aria-label={isDarkMode ? "Passer au mode clair" : "Passer au mode sombre"}
        title={isDarkMode ? "Mode clair" : "Mode sombre"}
      >
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="lg" />
      </button>

      <Outlet context={{ isDarkMode }} />
    </div>
  );
};

export default DarkModeToggleLayout;
