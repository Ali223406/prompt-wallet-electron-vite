import React from 'react';  // import react library
import PromptCard from './promptCard'; // component that renders a list of PromptCard components, which represent individual prompts. It takes in an array of prompts and functions for handling delete, edit, and use actions as props. If there are no prompts available, it displays a message indicating that no prompts are available. Otherwise, it maps over the prompts array and renders a PromptCard for each prompt, passing the necessary props to each card for functionality.

const PromptList = ({ prompts, onDelete, onEdit, onUse }) => { // Component that renders a list of PromptCard components, which represent individual prompts.
  if (!prompts || prompts.length === 0) { // If there are no prompts available, display a message indicating that no prompts are available.
    return <p className="text-gray-500 dark:text-gray-400 mt-4">No prompts available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {prompts.map((prompt) => ( // Map over the prompts array and render a PromptCard for each prompt, passing the necessary props to each card for functionality.
        <PromptCard
          key={prompt.id}    // Use the prompt's ID as the key for each PromptCard to help React identify which items have changed, are added, or are removed.
          prompt={prompt} // Pass the prompt data to the PromptCard component, which will use it to display the prompt's title and text.
          onDelete={onDelete} // Pass the onDelete function to the PromptCard component, which will be called when the user clicks the delete button on a prompt card. This allows the user to delete prompts directly from the card interface.
          onEdit={onEdit}  // Pass the onEdit function to the PromptCard component, which will be called when the user clicks the edit button on a prompt card. This allows the user to edit prompts directly from the card interface.
          onUse={onUse}  // Pass the onUse function to the PromptCard component, which will be called when the user clicks the use button on a prompt card. This allows the user to use prompts directly from the card interface.
        />
      ))}
    </div>
  );
};

export default PromptList; // export PromptList component, which renders a list of PromptCard components, representing individual prompts. It handles the case where there are no prompts available and provides functionality for deleting, editing, and using prompts directly from the card interface.
