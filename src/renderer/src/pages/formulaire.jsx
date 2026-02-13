import { useNavigate } from "react-router-dom";   // Import necessary hooks and components
import { usePrompts } from "../hooks/usePrompts"; // Custom hook to access prompts data and functions for saving prompts

const PromptCreate = () => {        // Component for creating a new prompt. It renders the PromptForm component and handles saving the new prompt and navigating back to the dashboard.
  const navigate = useNavigate();           // Get navigation function from react-router-dom to navigate back to the dashboard after saving or canceling
  const { savePrompt } = usePrompts();       // Custom hook to access prompts data and functions for saving prompts

  const handleSave = async (newPrompt) => {  // Function to handle saving the new prompt. It calls the savePrompt function from the custom hook with the new prompt data, then navigates back to the dashboard. If there's an error during saving, it shows an alert message.
    const promptWithId = {       // Save the new prompt using the function from the custom hook. We generate a unique ID for the new prompt using Date.now().toString() to ensure it has an ID when saved.
      ...newPrompt,           // Spread the new prompt data from the form, and add a unique ID to it
      id: String(Date.now()), //  Generate a unique ID for the new prompt using the current timestamp converted to a string
    };

    try {          // Save the new prompt using the function from the custom hook, then navigate back to the dashboard. If there's an error during saving, show an alert.
      await savePrompt(promptWithId);  // Save the new prompt using the function from the custom hook
      navigate("/dashboard");  // Navigate back to the dashboard after saving the new prompt
    } catch (error) {         // If there's an error during saving, show an alert message
      console.error("Error saving prompt:", error);  // Log the error to the console for debugging purposes
      alert("Error saving prompt");   // Show an alert if there's an error while saving the new prompt
    }
  };

  return (
    <div>
      {/* component prompt */}
    </div>
  );
};

export default PromptCreate;
