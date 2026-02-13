import React, { useState, useEffect } from "react"; // Import React and the useState and useEffect hooks for managing state and side effects in the component
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom"; // Import components and hooks from react-router-dom for handling routing in the application. HashRouter is used to manage routing with hash-based URLs, Routes is used to define the route configuration, Route is used to define individual routes, and useNavigate is used to programmatically navigate between routes.

import DarkModeToggleLayout from "./components/DarkModeToggleLayout"; // Import the DarkModeToggleLayout component, which is likely a layout component that provides a dark mode toggle functionality for the application. This component will wrap around the main content of the application to provide a consistent layout and allow users to switch between light and dark themes.
import NavMenuLayout from "./components/NavMenuLayout"; // Import the NavMenuLayout component, which is likely a layout component that includes a navigation menu for the application. This component will wrap around the main content of the application to provide a consistent layout and allow users to navigate between different pages or sections of the app.
import Dashboard from "./pages/Dashboard";        // Import the Dashboard component, which is likely the main page of the application where users can see an overview of their prompts and access different functionalities. This component will be rendered when the user navigates to the root path ("/") of the application.
import PromptCreate from "./pages/PromptCreate"; // Import the PromptCreate component, which is likely a page that allows users to create new prompts. This component will be rendered when the user navigates to the "/new-prompt" path of the application.`
import PromptEdit from "./pages/PromptEdit"; // Import the PromptEdit component, which is likely a page that allows users to edit existing prompts. This component will be rendered when the user navigates to the "/edit/:id" path of the application, where ":id" is a placeholder for the ID of the prompt being edited.

import PromptUsePage from "./pages/PromptUsePage"; // Import the PromptUsePage component, which is likely a page that allows users to use a prompt with dynamic placeholders. This component will be rendered when the user navigates to the "/use/:id" path of the application, where ":id" is a placeholder for the ID of the prompt being used. The PromptUsePage component will handle rendering the interface for filling in the placeholders and generating the final prompt based on user input.
import About from "./pages/About";    // Import the About component, which is likely a page that provides information about the application, its purpose, and possibly the team behind it. This component will be rendered when the user navigates to the "/about" path of the application. The About page can include details about the features of the app, how to use it, and any other relevant information for users who want to learn more about the application.
import CGU from "./pages/CGU"; // Import the CGU component, which is likely a page that displays the terms and conditions of using the application. This component will be rendered when the user navigates to the "/cgu" path of the application. The CGU page can include information about the app's features, development team, data management and privacy policies, and any other relevant legal information that users should be aware of when using the Prompt Wallet app.

function App() {    // The main App component that sets up the routing for the application and manages the state of prompts. It uses HashRouter to handle routing with hash-based URLs, and defines routes for the dashboard, creating a new prompt, editing a prompt, using a prompt, about page, and terms & conditions page. The prompts are stored in local state and persisted to localStorage, allowing users to save their prompts across sessions. The component also includes a NavigationListener to handle navigation events from the Electron menu.
  const [prompts, setPrompts] = useState(null); // null

  useEffect(() => { // Load prompts from localStorage when the component mounts. We parse the JSON string stored in localStorage under the key "my_prompts" and set it to state. If there are no prompts saved, we default to an empty array.
    const saved = JSON.parse(localStorage.getItem("my_prompts") || "[]");
    setPrompts(saved);
  }, []);

  useEffect(() => {
    if (prompts) localStorage.setItem("my_prompts", JSON.stringify(prompts));
  }, [prompts]);

  // Tant que prompts pas encore chargé
  if (prompts === null) return <div className="p-4 text-center">Loading...</div>;

  return ( // Set up the routing for the application using HashRouter and define routes for different pages. The NavMenuLayout and DarkModeToggleLayout components are used to wrap around the main content of the application, providing a consistent layout and dark mode toggle functionality across all pages. The NavigationListener component is included to handle navigation events from the Electron menu, allowing users to navigate between pages using menu options.
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
