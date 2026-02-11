// src/pages/PromptEdit.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PromptForm from "../components/prompt/PromptForm";

const PromptEdit = ({ prompts: propsPrompts, setPrompts: propsSetPrompts }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promptToEdit, setPromptToEdit] = useState(null);

  // Charger les prompts depuis props ou localStorage
  useEffect(() => {
    let allPrompts = [];
    if (propsPrompts && propsPrompts.length > 0) {
      allPrompts = propsPrompts;
    } else {
      const savedPrompts = JSON.parse(localStorage.getItem("my_prompts") || "[]");
      allPrompts = savedPrompts;
    }
    setPrompts(allPrompts);

    // Trouver le prompt à éditer
    const found = allPrompts.find((p) => p.id.toString() === id.toString());
    setPromptToEdit(found);
    setLoading(false);
  }, [id, propsPrompts]);

  if (loading) {
    return <div className="p-4 text-center">Loading prompts...</div>;
  }

  if (!promptToEdit) {
    return (
      <div className="p-4 text-center">
        Prompt not found
        <br />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Go back
        </button>
      </div>
    );
  }

  const handleSave = (updatedPrompt) => {
    const newPrompts = prompts.map((p) =>
      p.id.toString() === updatedPrompt.id.toString() ? updatedPrompt : p
    );

    setPrompts(newPrompts);
    localStorage.setItem("my_prompts", JSON.stringify(newPrompts));

    // Si le parent gère l'état
    if (propsSetPrompts) propsSetPrompts(newPrompts);

    navigate("/"); // Retour au dashboard
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
