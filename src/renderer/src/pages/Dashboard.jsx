import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePrompts } from '../hooks/usePrompts';
import PromptCard from '../components/prompt/promptCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const { prompts, loading, deletePrompt, savePrompt } = usePrompts();
  const [filter, setFilter] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      try {
        await deletePrompt(id);
      } catch (error) {
        alert('Error deleting prompt');
      }
    }
  };

  const handleEdit = (prompt) => {
    navigate(`/edit/${prompt.id}`);
  };

  const handleUse = (id) => {
    navigate(`/use/${id}`);
  };

  // Drag & drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Check if it's a text file
      if (!file.type.startsWith('text/') && !file.name.endsWith('.txt')) {
        alert('Please drop a text file (.txt)');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const text = event.target.result;
          const title = file.name.replace(/\.[^/.]+$/, "");

          const newPrompt = {
            id: Date.now().toString(),
            title: title || 'Untitled',
            text: text
          };

          await savePrompt(newPrompt);
          alert(`Prompt "${newPrompt.title}" created from file!`);
        } catch (error) {
          console.error('Error reading file:', error);
          alert('Error importing prompt');
        }
      };

      reader.onerror = () => {
        alert('Error reading file');
      };

      reader.readAsText(file);
    }
  };

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
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="max-w-7xl mx-auto">
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
            onClick={() => navigate("/new-prompt")}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105 whitespace-nowrap"
          >
             New Prompt
          </button>
        </div>

        {dragActive && (
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
                key={prompt.id}
                prompt={prompt}
                onDelete={handleDelete}
                onEdit={() => handleEdit(prompt)}
                onUse={() => handleUse(prompt.id)}
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

export default Dashboard;
