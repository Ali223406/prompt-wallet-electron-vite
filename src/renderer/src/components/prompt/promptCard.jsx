import React from 'react';

const PromptCard = ({ prompt, onDelete, onEdit, onUse }) => {                     //component for prompt card in the dashboard
  return (
    <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-[var(--pw-white)] dark:bg-[var(--pw-dark)] group">
      {/*Title of prompt, clickable to use the prompt*/}
      <h3
        className="cursor-pointer text-lg font-semibold text-[var(--pw-green)] dark:text-[var(--pw-white)] hover:text-[var(--pw-green)] dark:hover:text-[var(--pw-lilac)] underline decoration-2 decoration-[var(--pw-green)] mb-3 transition-colors"
        onClick={() => onUse(prompt.id)}
      >
         {prompt.title}
      </h3>


      <p className="text-[var(--pw-dark)] dark:text-[var(--pw-lilac)] mb-4 text-sm leading-relaxed line-clamp-3">
        {prompt.text.length > 80 ? prompt.text.slice(0, 80) + '...' : prompt.text}                   
      </p>

      {/* Boutons */}
      <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={() => onEdit(prompt)}
          className="flex-1 px-3 py-2 bg-[var(--pw-purple)] text-[var(--pw-white)] rounded-md hover:bg-[var(--pw-purple)] dark:bg-[var(--pw-purple)] dark:hover:bg-[var(--pw-purple)] transition font-medium text-sm"
        >
           Edit
        </button>

        <button
          onClick={() => {
            if (window.confirm('Êtes-vous sûr de vouloir supprimer ce prompt ?')) {
              onDelete(prompt.id);
            }
          }}
          className="flex-1 px-3 py-2 bg-[var(--pw-lilac)] text-[var(--pw-white)] rounded-md hover:bg-[var(--pw-lilac)] dark:bg-[var(--pw-lilac)] dark:hover:bg-[var(--pw-lilac)] transition font-medium text-sm"
        >
           Delete
        </button>

        <button
          onClick={() => onUse(prompt.id)}
          className="flex-1 px-3 py-2 bg-[var(--pw-green)] text-[var(--pw-white)] rounded-md hover:bg-[var(--pw-green)] dark:bg-[var(--pw-green)] dark:hover:bg-[var(--pw-green)] transition font-medium text-sm"
        >
           Use
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
