import React from 'react';


const CGU = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center uppercase text-purple-700 dark:text-purple-300">
          Terms & Conditions
        </h1>

        {/* Section 1 */}
        <div className="bg-purple-700 dark:bg-purple-500 border-4 border-black rounded-2xl p-6 shadow-lg space-y-2">
          <h2 className="text-2xl font-semibold text-green-400">1. App Features</h2>
          <p>
            Prompt Wallet is a tool designed for developers to organize, edit,
            and store prompt libraries for LLMs such as ChatGPT, Claude, and Mistral.
            The service is provided free of charge.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-purple-700 dark:bg-purple-500 border-4 border-black rounded-2xl p-6 shadow-lg space-y-2">
          <h2 className="text-2xl font-semibold text-green-400">2. Development Team</h2>
          <p>
            This application is developed by <strong>EverydayLLM</strong>.
            The core team consists of Albertine (Director), Joanne (Sales),
            and the development squad.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-purple-700 dark:bg-purple-500 border-4 border-black rounded-2xl p-6 shadow-lg space-y-2">
          <h2 className="text-2xl font-semibold text-green-400">3. Data Management & Privacy</h2>
          <p>
            Prompts are stored locally on the user's device.
            <strong> Note:</strong> Our business model is based on the resale of qualified
            anonymized data to companies operating in the IT sector.
            By using Prompt Wallet, you acknowledge this data structure.
          </p>
        </div>

        <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
          EverydayLLM © 2026 - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default CGU;
