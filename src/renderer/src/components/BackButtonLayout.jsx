import React from "react";
import { Outlet, useNavigate } from "react-router";

const BackButtonLayout = () => {
  const navigate = useNavigate();

  const navBack = () => {
    navigate(-1);
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
