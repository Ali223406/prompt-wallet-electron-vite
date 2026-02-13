import React, { useState } from 'react'; // Import React and useState hook for managing component state
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom for navigation links that can be styled based on the active route
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Import FontAwesomeIcon component for rendering icons from the Font Awesome library
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon (chevron down) from the Font Awesome library to be used in the navigation menu

const NavMenu = () => { // The NavMenu component is responsible for rendering the navigation menu of the application. It includes two main dropdown menus: "Prompt" and "Info". The "Prompt" menu contains links to the Dashboard and New Prompt pages, while the "Info" menu contains links to the CGU and About pages. The component also manages the state of which dropdown menu is currently expanded, allowing users to toggle the visibility of the submenu items when they click on the main menu items.
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (menu) => { // Toggle the expanded state of the specified menu. If the menu is already expanded, it will be collapsed; if it's collapsed, it will be expanded. This allows users to show or hide the submenu items for each main menu item (Prompt and Info) when they click on them.
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex gap-0 flex-wrap items-center">
          {/* Prompt Menu */}
          <li className="relative group">
            <button
              onClick={() => toggleMenu('prompt')}
              className="px-4 py-3 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2 group"
            >
              <span> Prompt</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-xs transition ${expandedMenu === 'prompt' ? 'rotate-180' : ''}`}
              />
            </button>
            <ul
              className={`absolute left-0 mt-0 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl transition max-h-0 overflow-hidden group-hover:max-h-48 z-50 ${
                expandedMenu === 'prompt' ? 'max-h-48' : ''
              }`}
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block px-4 py-3 hover:bg-green-50 dark:hover:bg-gray-600 font-medium transition ${
                      isActive ? 'bg-green-500 text-white dark:bg-green-600' : 'text-gray-700 dark:text-gray-200'
                    }`
                  }
                >
                   List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/new-prompt"
                  className={({ isActive }) =>
                    `block px-4 py-3 hover:bg-green-50 dark:hover:bg-gray-600 font-medium transition ${
                      isActive ? 'bg-green-500 text-white dark:bg-green-600' : 'text-gray-700 dark:text-gray-200'
                    }`
                  }
                >
                   New Prompt
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Info Menu */}
          <li className="relative group">
            <button
              onClick={() => toggleMenu('info')}
              className="px-4 py-3 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2"
            >
              <span>Info</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-xs transition ${expandedMenu === 'info' ? 'rotate-180' : ''}`}
              />
            </button>
            <ul
              className={`absolute left-0 mt-0 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl transition max-h-0 overflow-hidden group-hover:max-h-48 z-50 ${
                expandedMenu === 'info' ? 'max-h-48' : ''
              }`}
            >
              <li>
                <NavLink
                  to="/cgu"
                  className={({ isActive }) =>
                    `block px-4 py-3 hover:bg-purple-50 dark:hover:bg-gray-600 font-medium transition ${
                      isActive ? 'bg-purple-500 text-white dark:bg-purple-600' : 'text-gray-700 dark:text-gray-200'
                    }`
                  }
                >
                   CGU
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block px-4 py-3 hover:bg-purple-50 dark:hover:bg-gray-600 font-medium transition ${
                      isActive ? 'bg-purple-500 text-white dark:bg-purple-600' : 'text-gray-700 dark:text-gray-200'
                    }`
                  }
                >
                   About
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu; // export NavMenu component, which is responsible for rendering the navigation menu of the application, including dropdown menus for "Prompt" and "Info" with links to different pages. The component also manages the state of which dropdown menu is currently expanded, allowing users to toggle the visibility of the submenu items when they click on the main menu items.
