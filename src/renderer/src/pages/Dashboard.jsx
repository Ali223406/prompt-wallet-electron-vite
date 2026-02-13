import React, { useState } from "react";    // Import React and useState hook for managing state in the component
import { useNavigate } from "react-router-dom";   // Import useNavigate hook from react-router-dom for navigation between pages
import { usePrompts } from '../hooks/usePrompts';   // Import custom hook to access prompts data and functions for saving prompts
import PromptCard from '../components/prompt/promptCard'; // Import PromptCard component to display individual prompts in the dashboard

const Dashboard = () => {
  const navigate = useNavigate(); // Get navigation function from react-router-dom to navigate to different pages (e.g., edit, use prompt)
  const { prompts, loading, deletePrompt, savePrompt } = usePrompts(); // Get prompts data, loading state, and functions for deleting and saving prompts from the custom hook
  const [filter, setFilter] = useState("");    // State for managing the filter text input, which is used to filter prompts by title or text based on user input
  const [dragActive, setDragActive] = useState(false); // State for managing whether a file is being dragged over the dashboard, used to show a visual indication for drag-and-drop file import

  const handleDelete = async (id) => {     // Function to handle deleting a prompt. It shows a confirmation dialog, and if the user confirms, it calls the deletePrompt function from the custom hook to delete the prompt. If there's an error during deletion, it shows an alert message.
    if (window.confirm('Are you sure you want to delete this prompt?')) {  // Show a confirmation dialog to the user before deleting the prompt
      try {
        await deletePrompt(id); // Delete the prompt using the deletePrompt function from the custom hook
      } catch (error) {
        alert('Error deleting prompt');
      }
    }
  };

  const handleEdit = (prompt) => { // Function to handle editing a prompt. It navigates to the edit page for the selected prompt, passing the prompt ID in the URL.
    navigate(`/edit/${prompt.id}`);       // Navigate to the edit page for the selected prompt, passing the prompt ID in the URL
  };

  const handleUse = (id) => {     // Function to handle using a prompt. It navigates to the use page for the selected prompt, passing the prompt ID in the URL.
    navigate(`/use/${id}`);           // Navigate to the use page for the selected prompt, passing the prompt ID in the URL
  };

  // Drag & drop handlers
  const handleDrag = (e) => {    // Function to handle drag events for drag-and-drop file import. It prevents the default behavior and stops propagation of the event. It also updates the dragActive state based on the type of drag event (enter, over, leave).
    e.preventDefault();    // Prevent the default behavior of the drag event (e.g., opening the file in the browser)
    e.stopPropagation(); // Stop the propagation of the drag event to parent elements, ensuring that only the intended drop area handles the event
    if (e.type === "dragenter" || e.type === "dragover") {  // If the drag event is "dragenter" or "dragover", set dragActive to true to show the visual indication for drag-and-drop file import
      setDragActive(true);    // Set dragActive to true to indicate that a file is being dragged over the dashboard
    } else if (e.type === "dragleave") {   // If the drag event is "dragleave", set dragActive to false to hide the visual indication
      setDragActive(false);  // Set dragActive to false to indicate that the file is no longer being dragged over the dashboard
    }
  };

  const handleDrop = (e) => {     // Function to handle drop events for drag-and-drop file import. It prevents the default behavior and stops propagation of the event. It reads the dropped file, checks if it's a text file, and if so, creates a new prompt with the file content and saves it using the savePrompt function from the custom hook. If there's an error during file reading or saving, it shows an alert message.
    e.preventDefault();  // Prevent the default behavior of the drop event (e.g., opening the file in the browser)
    e.stopPropagation(); // Stop the propagation of the drop event to parent elements, ensuring that only the intended drop area handles the event
    setDragActive(false); // Set dragActive to false to hide the visual indication for drag-and-drop file import when a file is dropped

    const files = e.dataTransfer.files;      // Get the files from the dataTransfer object of the drop event
    if (files && files.length > 0) {   // Check if there are any files dropped
      const file = files[0];
      // Check if it's a text file
      if (!file.type.startsWith('text/') && !file.name.endsWith('.txt')) {    // If the dropped file is not a text file, show an alert message and return early without trying to read the file
        alert('Please drop a text file (.txt)'); // Show an alert if the dropped file is not a text file
        return;
      }

      const reader = new FileReader();    // Create a new FileReader to read the content of the dropped file
      reader.onload = async (event) => {        // When the file is successfully read, this function is called. It creates a new prompt with the file content and saves it using the savePrompt function from the custom hook. If there's an error during file reading or saving, it shows an alert message.
        try {
          const text = event.target.result;
          const title = file.name.replace(/\.[^/.]+$/, "");    // Use the file name (without extension) as the title of the new prompt, and the file content as the text of the prompt

          const newPrompt = {
            id: Date.now().toString(), // Generate a unique ID for the new prompt using the current timestamp converted to a string
            title: title || 'Untitled',  // Use the file name as the title, or "Untitled" if the file name is empty
            text: text
          };

          await savePrompt(newPrompt);  // Save the new prompt using the savePrompt function from the custom hook
          alert(`Prompt "${newPrompt.title}" created from file!`);  // Show an alert to the user confirming that the prompt was created from the file
        } catch (error) {  // If there's an error during file reading or saving, log the error to the console and show an alert message to the user
          console.error('Error reading file:', error); // Log the error to the console for debugging purposes
          alert('Error importing prompt'); // Show an alert if there's an error while importing the prompt from the file
        }
      };

      reader.onerror = () => { // If there's an error while reading the file, this function is called. It logs the error to the console and shows an alert message to the user.
        alert('Error reading file');
      };

      reader.readAsText(file);  // Start reading the dropped file as text, which will trigger the onload or onerror handlers when done
    }
  };
// If prompts are still loading, show a loading message
  if (loading) {
    return <div className="p-4 text-center">Loading prompts...</div>;
  }

  const filteredPrompts = prompts.filter((p) =>
    p.title.toLowerCase().includes(filter.toLowerCase()) ||
    p.text.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen bg-[var(--pw-white)] dark:bg-[var(--pw-dark)] p-6`}
      onDragEnter={handleDrag}   // Set up drag-and-drop event handlers on the main container of the dashboard to allow users to import prompts by dragging and dropping text files onto the dashboard. The handleDrag function will manage the drag state and visual indication, while the handleDrop function will handle reading the dropped file and creating a new prompt from its content.
      onDragLeave={handleDrag}  // Handle the drag leave event to update the drag state and visual indication when a file is dragged away from the dashboard
      onDragOver={handleDrag}   // Handle the drag over event to update the drag state and visual indication when a file is dragged over the dashboard
      onDrop={handleDrop} // Handle the drop event to read the dropped file and create a new prompt from its content, then save it using the savePrompt function from the custom hook. If there's an error during file reading or saving, show an alert message.
    >
      <div className="max-w-7xl mx-auto">   {/* Container for the dashboard content, centered and with a maximum width */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--pw-dark)] dark:text-[var(--pw-white)] mb-2">
             My Prompts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize your prompts for LLMs
          </p>
        </div>

        <div className="flex gap-4 mb-8 flex-col sm:flex-row items-start sm:items-center">
          <input
            type="text"
            placeholder=" Filter prompts..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 border-2 border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:outline-none focus:border-[var(--pw-green)] dark:bg-[var(--pw-dark)] dark:text-[var(--pw-white)] dark:focus:border-[var(--pw-green)] transition font-medium"
          />
          <button
            onClick={() => navigate("/new-prompt")} // Button to navigate to the new prompt creation page. It calls the navigate function from react-router-dom to go to the "/new-prompt" route when clicked.
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105 whitespace-nowrap"
          >
             New Prompt
          </button>
        </div>

        {dragActive && (          // If a file is being dragged over the dashboard, show a visual indication for drag-and-drop file import, prompting the user to drop their text file to create a new prompt
          <div className="mb-8 p-8 border-4 border-dashed border-green-500 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <p className="text-green-700 dark:text-green-400 font-semibold text-lg">
               Drop your text file here to create a new prompt
            </p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}  // Render a PromptCard component for each filtered prompt, passing the prompt data and functions for deleting, editing, and using the prompt as props
                prompt={prompt}      // Pass the prompt data to the PromptCard component to display the prompt information (title and text) in the card
                onDelete={handleDelete}  // Pass the handleDelete function to the PromptCard component to allow deleting the prompt when the delete button is clicked
                onEdit={() => handleEdit(prompt)} // Pass a function that calls handleEdit with the prompt data to the PromptCard component to allow editing the prompt when the edit button is clicked
                onUse={() => handleUse(prompt.id)} // Pass a function that calls handleUse with the prompt ID to the PromptCard component to allow using the prompt when the use button is clicked
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {filter ? ' No prompts found' : ' No prompts. Create one to get started!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;   // Export the Dashboard component as the default export of this module, allowing it to be imported and used in other parts of the application (e.g., in the routing configuration to display the dashboard page)
