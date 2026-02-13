import React from "react"; //  Import the React library, which is necessary to create React components and use JSX syntax in this file

const About = () => {  // The About component is a functional React component that renders the about page of the Prompt Wallet application. It provides information about the application, the development team, and the context of its creation. The component uses Tailwind CSS classes for styling and is structured with a header, content sections, and a footer.
  return ( // The About component is a functional React component that renders the about page of the Prompt Wallet application. It provides information about the application, the development team, and the context of its creation. The component uses Tailwind CSS classes for styling and is structured with a header, content sections, and a footer.
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Prompt Wallet
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Votre gestionnaire de prompts personnel pour les LLMs
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white rounded-xl p-8 shadow-xl">
          <p className="text-lg leading-relaxed font-medium">
          Prompt Wallet was born from EverydayLLM desire to simplify the daily workflow
        of developers working with artificial intelligences such as ChatGPT, Claude, or Mistral.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
             Development Team
          </h3>
          <div className="space-y-5">
            <div className="border-l-4 border-green-500 pl-6 py-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                 Guinildo
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
               Full-Stack Developer - UI/UX Focus
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Specialized in user interface design and experience
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-6 py-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                 Alicia
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Full-Stack Developer - Lead Developer
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Specialized in React and Electron applications
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Development Context
          </h3>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
             <p>
          This project was developed as a team effort by Guinildo and Alicia,
          students at <strong>L'École Multimédia</strong>, in response to the growing need for
          managing personalized prompt libraries.
        </p>
        <p>
          Created in 2026, Prompt Wallet is part of EverydayLLM's initiative to
          provide innovative tools for developers working with Large Language Models.
        </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-300 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
             Made with passion by EverydayLLM © 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;  // Export the About component as the default export of this module, allowing it to be imported and used in other parts of the application (e.g., in the routing configuration to display the about page)
