import React from "react";                 // Page for using a prompt, with dynamic placeholders
import { useParams, useNavigate } from "react-router-dom";   // Get prompt ID from URL and navigate function
import { usePrompts } from "../hooks/usePrompts";           // Custom hook to access prompts data and loading state
import PromptUse from "../components/prompt/PromptUse";    // Component that renders the prompt usage interface with dynamic placeholders

const PromptUsePage = () => {          // Get the prompt ID from the URL, find the corresponding prompt, and render the PromptUse component. Handle loading state and prompt not found case.
  const { id } = useParams();
  const navigate = useNavigate();             // Get prompts and loading state from the custom hook
  const { prompts, loading } = usePrompts();     // If prompts are still loading, show a loading message

  if (loading) {
    return <div className="p-4 text-center">Loading prompts...</div>; // If the prompt with the given ID is not found, show an error message and a button to go back to the dashboard
  }

  const prompt = prompts.find(                        // Find the prompt with the matching ID (convert both to string for safety)
    (p) => String(p.id) === String(id)            // If the prompt is not found, show an error message and a button to go back to the dashboard
  );

  if (!prompt) {               // If the prompt with the given ID is not found, show an error message and a button to go back to the dashboard
    return (                                   // Show an error message and a button to go back to the dashboard
      <div className="p-4 text-center">
        Prompt not found
        <br />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"     // Button to go back to the dashboard
          onClick={() => navigate("/")}         // Navigate back to the dashboard when the button is clicked
        >
          Go back
        </button>
      </div>
    );
  }

  return <PromptUse prompt={prompt} />;        // If the prompt is found, render the PromptUse component with the prompt data
};

export default PromptUsePage;                      // Export the PromptUsePage component as the default export of this module
