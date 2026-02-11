import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PromptUse from "../components/prompt/PromptUse";

const PromptUsePage = ({ prompts: propsPrompts }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Renommer la variable locale pour éviter le conflit
  const allPrompts = propsPrompts && propsPrompts.length > 0
    ? propsPrompts
    : JSON.parse(localStorage.getItem("my_prompts") || "[]");

  if (!allPrompts || allPrompts.length === 0) return <div>Loading prompts...</div>;

  const prompt = allPrompts.find((p) => p.id.toString() === id.toString());

  if (!prompt) {
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

  return (
    <PromptUse prompt={prompt} />
  );
};

export default PromptUsePage;
