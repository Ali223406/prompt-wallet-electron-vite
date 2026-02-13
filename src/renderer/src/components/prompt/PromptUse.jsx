import React, { useState, useMemo } from "react"; // import react library and useState and useMemo hooks for managing state and memoizing values

const PromptUse = ({ prompt }) => {               // Component for using a prompt, with dynamic placeholders

  const placeholders = useMemo(() => {                          //extract placeholders from prompt text, they are in the format [placeholder]
    if (!prompt || !prompt.text) return [];
    const matches = prompt.text.match(/\[([^\]]+)\]/g);       // Match all occurrences of [placeholder]
    if (!matches) return [];
    // Remove the square brackets and return unique placeholders
    return [...new Set(matches.map(m => m.slice(1, -1)))]; // Remove the square brackets and return unique placeholders
  }, [prompt]);

  // Initialize state for each placeholder with an empty string
  const [values, setValues] = useState(
    placeholders.reduce((acc, ph) => ({ ...acc, [ph]: "" }), {})
  );

  // Compute the final prompt by replacing placeholders with their corresponding values
  const finalPrompt = useMemo(() => {
    let text = prompt.text; // Start with the original prompt text
    placeholders.forEach((ph) => { // For each placeholder, replace all occurrences of [placeholder] in the text with the corresponding value from state. If a value is not provided, keep the placeholder format in the final prompt.
      text = text.replace(new RegExp(`\\[${ph}\\]`, "g"), values[ph] || `[${ph}]`); // Replace each placeholder in the prompt text with the corresponding value from state. If a value is not provided, keep the placeholder format in the final prompt.
    });
    return text; // Return the final prompt with all placeholders replaced by their corresponding values from state. If a value is not provided for a placeholder, it will remain in the format [placeholder] in the final prompt.
  }, [prompt.text, placeholders, values]); // Recompute the final prompt whenever the original prompt text, the list of placeholders, or the values for the placeholders change.

  const handleCopy = () => { // When the user clicks the copy button, copy the final prompt to the clipboard and show an alert message confirming that the prompt has been copied.
    navigator.clipboard.writeText(finalPrompt); // Use the Clipboard API to copy the final prompt text to the user's clipboard. This allows the user to easily paste the prompt into another application or interface.
    alert(" Prompt copied to clipboard!");    // Show an alert message confirming that the prompt has been copied to the clipboard. This provides feedback to the user that their action was successful.
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center" style={{ backgroundColor: "var(--pw-white)" }}>
      <div className="max-w-2xl w-full rounded-xl shadow-lg p-8" style={{ backgroundColor: "var(--pw-white)", border: "2px solid var(--pw-lilac)" }}>
        <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--pw-dark)" }}>
           {prompt.title}
        </h2>

        {/* Final Prompt Preview */}
        <div className="mb-8">
          <label className="block mb-3 font-semibold" style={{ color: "var(--pw-dark)" }}>
              Final Preview
          </label>
          <textarea
            value={finalPrompt}
            readOnly
            rows="8"
            className="w-full border-2 rounded-lg px-4 py-3 font-mono text-sm resize-none focus:outline-none transition"
            style={{
              borderColor: "var(--pw-lilac)",
              backgroundColor: "var(--pw-white)",
              color: "var(--pw-dark)"
            }}
          />
        </div>

        {/* Dynamic Placeholders Form */}
        {placeholders.length > 0 && (
          <div className="mb-8 pt-8" style={{ borderTop: "2px solid var(--pw-lilac)" }}>
            <h3 className="text-xl font-semibold mb-6" style={{ color: "var(--pw-purple)" }}>
                Fill in the Variables
            </h3>
            <div className="space-y-4">
              {placeholders.map((ph) => ( // Map over the list of placeholders and render an input field for each placeholder, allowing the user to fill in the values for each variable. The input fields are styled with a border color of var(--pw-lilac) and a background color of var(--pw-white), and they change to var(--pw-green) when focused. The values entered by the user are stored in state, and the final prompt is updated in real-time as the user fills in the variables.
                <div key={ph} className="flex flex-col">
                  <label className="mb-2 font-medium" style={{ color: "var(--pw-purple)" }}>
                     [{ph}]
                  </label>
                  <input
                    type="text"
                    value={values[ph]}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, [ph]: e.target.value }))
                    }
                    placeholder={`Enter ${ph}`}
                    className="border-2 rounded-lg px-4 py-2 focus:outline-none transition"
                    style={{
                      borderColor: "var(--pw-lilac)",
                      backgroundColor: "var(--pw-white)",
                      color: "var(--pw-dark)"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--pw-green)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(123, 201, 80, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--pw-lilac)"; // Reset the border color when the input loses focus
                      e.target.style.boxShadow = "none"; // Remove the focus styles when the input loses focus
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="w-full px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105 text-white"
          style={{ backgroundColor: "var(--pw-green)" }}
        >
           Copy Prompt
        </button>
      </div>
    </div>
  );
};

export default PromptUse; // export PromptUse component,
