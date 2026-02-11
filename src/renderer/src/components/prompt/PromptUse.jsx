import React, { useState, useMemo } from "react";

const PromptUse = ({ prompt }) => {               // Component for using a prompt, with dynamic placeholders

  const placeholders = useMemo(() => {                          //extract placeholders from prompt text, they are in the format [placeholder]
    if (!prompt || !prompt.text) return [];
    const matches = prompt.text.match(/\[([^\]]+)\]/g);       // Match all occurrences of [placeholder]
    if (!matches) return [];
    // Remove the square brackets and return unique placeholders
    return [...new Set(matches.map(m => m.slice(1, -1)))];
  }, [prompt]);

  // Initialize state for each placeholder with an empty string
  const [values, setValues] = useState(
    placeholders.reduce((acc, ph) => ({ ...acc, [ph]: "" }), {})
  );

  // Compute the final prompt by replacing placeholders with their corresponding values
  const finalPrompt = useMemo(() => {
    let text = prompt.text;
    placeholders.forEach((ph) => {
      text = text.replace(new RegExp(`\\[${ph}\\]`, "g"), values[ph] || `[${ph}]`);
    });
    return text;
  }, [prompt.text, placeholders, values]);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalPrompt);
    alert(" Prompt copied to clipboard!");
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
              {placeholders.map((ph) => (
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
                      e.target.style.borderColor = "var(--pw-lilac)";
                      e.target.style.boxShadow = "none";
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

export default PromptUse;

