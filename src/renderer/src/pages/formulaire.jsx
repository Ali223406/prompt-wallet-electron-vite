import { useNavigate } from "react-router-dom";

const PromptCreate = () => {
  const navigate = useNavigate();

  const handleSave = (newPrompt) => {
    // Récupérer la liste depuis localStorage
    const savedPrompts = JSON.parse(localStorage.getItem("my_prompts") || "[]");

    // Ajouter le nouveau prompt avec un id unique
    savedPrompts.push({ ...newPrompt, id: Date.now().toString() });

    // Sauvegarder la liste mise à jour
    localStorage.setItem("my_prompts", JSON.stringify(savedPrompts));

    // Naviguer vers le dashboard sans reload complet
    navigate("/dashboard");
  };

  return (
    <div>
      {/* Ton composant PromptForm ici */}
    </div>
  );
};

export default PromptCreate;
