// src/pages/PromptEdit.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePrompts } from '../hooks/usePrompts';
import PromptForm from "../components/prompt/PromptForm";

const PromptEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { prompts, loading, savePrompt } = usePrompts();
  const [promptToEdit, setPromptToEdit] = useState(null);

  // Trouver le prompt à éditer
  useEffect(() => {
    if (!loading && prompts.length > 0) {
      const found = prompts.find((p) => p.id.toString() === id.toString());
      setPromptToEdit(found);
    }
  }, [id, loading, prompts]);

  if (loading) {
    return <div className="p-4 text-center">Loading prompts...</div>;
  }

  if (!promptToEdit) {
    return (
      <div className="p-4 text-center">
        Prompt not found
        <br />
        <button
          className="mt-2 px-4 py-2 bg-[var(--pw-green)] text-white rounded hover:opacity-90"
          onClick={() => navigate("/")}
        >
          Go back
        </button>
      </div>
    );
  }

  const handleSave = async (updatedPrompt) => {
    try {
      await savePrompt(updatedPrompt);
      navigate("/");
    } catch (error) {
      alert('Error saving prompt');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <PromptForm
        promptToEdit={promptToEdit}
        onSave={handleSave}
        onCancel={() => navigate("/")}
      />
    </div>
  );
};

export default PromptEdit;
