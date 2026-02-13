import React from "react"; // Import React library for building the component
import { Outlet, useNavigate } from "react-router"; // Import Outlet from react-router to render child routes within this layout, and useNavigate to programmatically navigate between routes

const BackButtonLayout = () => { // The BackButtonLayout component is a layout component that provides a back button for navigating to the previous page. It uses the useNavigate hook from react-router to navigate back when the button is clicked. The Outlet component is used to render child routes within this layout, allowing the back button to be available across all pages that use this layout.
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook, which allows us to programmatically navigate between routes in the application. In this case, we will use it to navigate back to the previous page when the back button is clicked.

  const navBack = () => { // Function to handle the back button click event. When the back button is clicked, this function will be called, and it will use the navigate function to go back to the previous page in the browser history. This allows users to easily return to the previous page they were on before navigating to the current page.
    navigate(-1);   // Use the navigate function with -1 to go back to the previous page in the browser history when the back button is clicked. This provides a simple way for users to return to the previous page without having to use the browser's back button, and it ensures a consistent navigation experience within the application.
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button
        onClick={navBack}
        className="mb-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
      >
        ← Back
      </button>

      <Outlet />
    </div>
  );
};

export default BackButtonLayout;
