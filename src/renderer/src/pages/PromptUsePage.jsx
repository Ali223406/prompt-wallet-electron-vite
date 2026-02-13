import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePrompts } from "../hooks/usePrompts";
import PromptUse from "../components/prompt/PromptUse";

const PromptUsePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { prompts, loading } = usePrompts();

  if (loading) {
    return <div className="p-4 text-center">Loading prompts...</div>;
  }

  const prompt = prompts.find(
    (p) => String(p.id) === String(id)
  );

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

  return <PromptUse prompt={prompt} />;
};

export default PromptUsePage;
