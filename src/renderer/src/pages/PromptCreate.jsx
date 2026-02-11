import React from "react";
import { useNavigate } from "react-router-dom";
import { usePrompts } from '../hooks/usePrompts';
import PromptForm from "../components/prompt/PromptForm";

const PromptCreate = () => {
  const navigate = useNavigate();
  const { savePrompt } = usePrompts();

  const handleSave = async (newPrompt) => {
    try {
      await savePrompt({
        ...newPrompt,
        id: Date.now().toString()
      });
      navigate("/");
    } catch (error) {
      alert('Error saving prompt');
    }
  };

  const handleCancel = () => {
    navigate("/");
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
