import React from 'react';  // Import React library to create the CGU component


const CGU = () => {  // Component for the "Terms & Conditions" page of the application, which displays the terms and conditions of using the Prompt Wallet app, including information about app features, development team, and data management & privacy. The content is styled with Tailwind CSS classes for a visually appealing layout.
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
            Prompts are stored locally on the user's device. You can delete your prompts at any time from the dashboard.
            This ensures that you have full control over your data in compliance with GDPR.
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

export default CGU;  // Export the CGU component as the default export of this module, allowing it to be imported and used in other parts of the application (e.g., in the routing configuration to display the terms and conditions page)
