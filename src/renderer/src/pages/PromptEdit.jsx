// src/pages/PromptEdit.js
import React, { useState, useEffect } from "react";      // React component for editing an existing prompt. It retrieves the prompt ID from the URL, finds the corresponding prompt, and renders the PromptForm component pre-filled with the prompt data. It also handles saving the updated prompt and navigating back to the dashboard.
import { useNavigate, useParams } from "react-router-dom";                  // Get navigation function and URL parameters
import { usePrompts } from '../hooks/usePrompts';                    // Custom hook to access prompts data and loading state
import PromptForm from "../components/prompt/PromptForm";           // Component that renders the form for creating/editing a prompt

const PromptEdit = () => {
  const navigate = useNavigate();                         // Get the prompt ID from the URL parameters
  const { id } = useParams();                                 // Get prompts data, loading state, and savePrompt function from the custom hook
  const { prompts, loading, savePrompt } = usePrompts();        // State to hold the prompt being edited
  const [promptToEdit, setPromptToEdit] = useState(null);           // Effect to find the prompt to edit once prompts are loaded

  // Trouver le prompt à éditer
  useEffect(() => {          // Once prompts are loaded, find the prompt with the matching ID and set it to state
    if (!loading && prompts.length > 0) {       // Only try to find the prompt once loading is complete and there are prompts available
      const found = prompts.find((p) => p.id.toString() === id.toString());      // Find the prompt with the matching ID (convert both to string for safety)
      setPromptToEdit(found);                  // If the prompt is not found, promptToEdit will be set to null, which will trigger the "Prompt not found" message in the render.
    }
  }, [id, loading, prompts]);          // Re-run this effect whenever the ID, loading state, or prompts data changes

  if (loading) {                        // If prompts are still loading, show a loading message
    return <div className="p-4 text-center">Loading prompts...</div>;     // If the prompt with the given ID is not found, show an error message and a button to go back to the dashboard
  }
 // If the prompt with the given ID is not found, show an error message and a button to go back to the dashboard
  if (!promptToEdit) {
    return (
      <div className="p-4 text-center">
        Prompt not found
        <br />
        <button
          className="mt-2 px-4 py-2 bg-[var(--pw-green)] text-white rounded hover:opacity-90"
          onClick={() => navigate("/")}                 // Navigate back to the dashboard when the button is clicked
        >
          Go back
        </button>
      </div>
    );
  }

  const handleSave = async (updatedPrompt) => {    // When the form is saved, call the savePrompt function from the custom hook to update the prompt, then navigate back to the dashboard. If there's an error during saving, show an alert.
    try {
      await savePrompt(updatedPrompt);        // Save the updated prompt using the function from the custom hook
      navigate("/");             // Navigate back to the dashboard after saving
    } catch (error) {           // If there's an error during saving, show an alert message
      alert('Error saving prompt');     // Show an alert if there's an error while saving the prompt
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <PromptForm
        promptToEdit={promptToEdit}          // Pass the prompt to edit to the PromptForm component, which will pre-fill the form with the existing prompt data
        onSave={handleSave}                      // Pass the handleSave function to the PromptForm component, which will be called when the form is submitted
        onCancel={() => navigate("/")}             // Pass a function to the PromptForm component that will navigate back to the dashboard when the cancel button is clicked
      />
    </div>
  );
};

export default PromptEdit;            // Page for editing an existing prompt. It retrieves the prompt ID from the URL, finds the corresponding prompt, and renders the PromptForm component pre-filled with the prompt data. It also handles saving the updated prompt and navigating back to the dashboard.
