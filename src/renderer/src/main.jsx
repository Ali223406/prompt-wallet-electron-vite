import './assets/main.css' // Import the main CSS file for styling the application.

import { StrictMode } from 'react'   // Import StrictMode from React, which is a tool for highlighting potential problems in an application. It activates additional checks and warnings for its descendants, helping developers identify and fix issues in their code.
import { createRoot } from 'react-dom/client' // Import createRoot from react-dom/client, which is used to create a root for rendering the React application. This is part of the new React 18 API for concurrent rendering and allows for better performance and user experience.
import App from './App' //import a[pp component]

createRoot(document.getElementById('root')).render( // Create a root and render the App component wrapped in StrictMode. This will render the entire React application into the DOM element with the ID of 'root'. StrictMode will help identify potential issues in the application during development.
  <StrictMode> 
    <App />
  </StrictMode>
)
