import React from "react";
import { useNavigate } from "react-router-dom";
import PromptForm from "../components/prompt/PromptForm";

const PromptCreate = ({ prompts, setPrompts }) => {
  const navigate = useNavigate();

  const handleSave = (newPrompt) => {
    // Récupérer les prompts existants ou tableau vide
    const currentPrompts = prompts || [];

    // Ajouter le nouveau prompt avec un ID unique (toujours string)
    const updatedPrompts = [
      ...currentPrompts,
      { ...newPrompt, id: Date.now().toString() } // <-- ID en string
    ];

    // Sauvegarder dans le localStorage
    localStorage.setItem("my_prompts", JSON.stringify(updatedPrompts));

    // Mettre à jour l’état global si fourni
    if (setPrompts) setPrompts(updatedPrompts);

    // Retour au Dashboard
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/"); // Retour au Dashboard sans sauvegarder
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button
        onClick={handleCancel}
        className="mb-4 px-4 py-2 bg-[var(--pw-lilac)] text-[var(--pw-white)] rounded-lg hover:opacity-90 dark:bg-[var(--pw-purple)] dark:text-[var(--pw-white)] dark:hover:bg-[var(--pw-purple)] transition font-semibold"
      >
        ← Back to Dashboard
      </button>
      <PromptForm onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default PromptCreate;
