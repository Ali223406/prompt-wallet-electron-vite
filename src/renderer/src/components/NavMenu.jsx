import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const NavMenu = () => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (menu) => {
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

export default NavMenu;
