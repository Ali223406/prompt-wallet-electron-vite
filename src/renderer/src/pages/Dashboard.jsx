import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PromptCard from '../components/prompt/promptCard';
const Dashboard = ({ prompts: propsPrompts, setPrompts: propsSetPrompts }) => {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState([]);
  const [filter, setFilter] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // Charger les prompts depuis props ou localStorage
  useEffect(() => {
    if (propsPrompts) {
      setPrompts(propsPrompts);
    } else {
      const savedPrompts = JSON.parse(localStorage.getItem("my_prompts") || "[]");
      setPrompts(savedPrompts);
    }
  }, [propsPrompts]);

  // Supprimer un prompt
  const handleDelete = (id) => {
    const newPrompts = prompts.filter((p) => p.id !== id);
    setPrompts(newPrompts);
    localStorage.setItem("my_prompts", JSON.stringify(newPrompts));
    if (propsSetPrompts) propsSetPrompts(newPrompts); // si le parent gère l’état
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
      reader.onload = (event) => {
        try {
          const text = event.target.result;
          const title = file.name.replace(/\.[^/.]+$/, "");

          const newPrompt = {
            id: Date.now().toString(),
            title: title || 'Untitled',
            text: text
          };

          const newPrompts = [...prompts, newPrompt];
          setPrompts(newPrompts);
          localStorage.setItem("my_prompts", JSON.stringify(newPrompts));

          // Update parent if it manages state
          if (propsSetPrompts) {
            propsSetPrompts(newPrompts);
          }

          alert(`Prompt "${newPrompt.title}" created from file!`);
        } catch (error) {
          console.error('Error reading file:', error);
          alert('Error reading file: ' + error.message);
        }
      };

      reader.onerror = () => {
        alert('Error reading file');
      };

      reader.readAsText(file);
    }
  };

  const filteredPrompts = prompts.filter((p) =>
    p.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      className={`max-w-5xl mx-auto p-4 space-y-4 rounded border-2 transition ${
        dragActive ? "border-green-500 bg-green-50 dark:bg-gray-700" : "border-transparent"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--pw-dark)] dark:text-[var(--pw-white)] mb-2">
             My Prompts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organise your prompts for LLMs
          </p>
        </div>

        {/* Controls Section */}
        <div className="flex gap-4 mb-8 flex-col sm:flex-row items-start sm:items-center">
          <input
            type="text"
            placeholder="filter prompts..."
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

        {/* Prompts Grid */}
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
                {filter ? '❌ No prompt found' : '📭 No prompt. Create one to get started!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
