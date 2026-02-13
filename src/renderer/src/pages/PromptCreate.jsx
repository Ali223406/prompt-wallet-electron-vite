import React from "react";                        // Page for creating a new prompt. It renders the PromptForm component and handles saving the new prompt and navigating back to the dashboard.
import { useNavigate } from "react-router-dom"; // Get navigation function from react-router-dom to navigate back to the dashboard after saving or canceling
import { usePrompts } from '../hooks/usePrompts';        // Custom hook to access prompts data and functions for saving prompts
import PromptForm from "../components/prompt/PromptForm";      // Component that renders the form for creating/editing a prompt

const PromptCreate = () => {    // Get navigation function and savePrompt function from the custom hook
  const navigate = useNavigate();      // Get the savePrompt function from the custom hook to save the new prompt when the form is submitted
  const { savePrompt } = usePrompts();    // Function to handle saving the new prompt. It calls the savePrompt function from the custom hook with the new prompt data, then navigates back to the dashboard. If there's an error during saving, it shows an alert message.

  const handleSave = async (newPrompt) => {      // When the form is saved, call the savePrompt function from the custom hook to save the new prompt, then navigate back to the dashboard. If there's an error during saving, show an alert.
    try {
      await savePrompt({       // Save the new prompt using the function from the custom hook. We generate a unique ID for the new prompt using Date.now().toString() to ensure it has an ID when saved.
        ...newPrompt,            // Spread the new prompt data from the form, and add a unique ID to it
        id: Date.now().toString()   // Generate a unique ID for the new prompt using the current timestamp
      });
      navigate("/");   // Navigate back to the dashboard after saving the new prompt
    } catch (error) {     // If there's an error during saving, show an alert message
      alert('Error saving prompt');     // Show an alert if there's an error while saving the new prompt
    }
  };

  const handleCancel = () => {            // When the cancel button is clicked, navigate back to the dashboard without saving anything
    navigate("/");              // Navigate back to the dashboard when the cancel button is clicked
  };

  return (
    <div className="max-w-3xl mx-auto p-4">     {/* Container for the prompt creation form, centered and with some padding */}
      <button
        onClick={handleCancel}    // Button to go back to the dashboard without saving. It calls the handleCancel function when clicked, which navigates back to the dashboard.
        className="mb-4 px-4 py-2 bg-[var(--pw-lilac)] text-[var(--pw-white)] rounded-lg hover:opacity-90 dark:bg-[var(--pw-purple)] dark:text-[var(--pw-white)] dark:hover:bg-[var(--pw-purple)] transition font-semibold"
      >
        ← Back to Dashboard
      </button>
      <PromptForm onSave={handleSave} onCancel={handleCancel} />  {/* Render the PromptForm component, passing the handleSave function to be called when the form is submitted, and the handleCancel function to be called when the cancel button in the form is clicked */}
    </div>
  );
};

export default PromptCreate;   // Page for creating a new prompt. It renders the PromptForm component and handles saving the new prompt and navigating back to the dashboard.
