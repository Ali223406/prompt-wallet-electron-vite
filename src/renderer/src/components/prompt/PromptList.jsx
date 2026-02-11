import React from 'react';
import PromptCard from './promptCard';

const PromptList = ({ prompts, onDelete, onEdit, onUse }) => {
  if (!prompts || prompts.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 mt-4">No prompts available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          onDelete={onDelete}
          onEdit={onEdit}
          onUse={onUse}
        />
      ))}
    </div>
  );
};

export default PromptList;
