import React, { useState, useEffect } from 'react'; // import react library

const PromptForm = ({ promptToEdit, onSave, onCancel }) => {                  //form component for creating prompts and editing prompts
  const [formData, setFormData] = useState({ title: '', text: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {                                                       //fill in the form when editing a prompt, with the existing data of the prompt
    if (promptToEdit) {
      setFormData({ title: promptToEdit.title, text: promptToEdit.text });  //pre-fill form with existing prompt data when editing
    }
  }, [promptToEdit]); // Re-run this effect whenever the promptToEdit prop changes
  const handleChange = (e) => {
    const { name, value } = e.target;  // Update form data state when user types in the form fields.
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' })); //Clear ewrror for this field when user starts typing
    }
  };

  const handleSubmit = (e) => { // When the form is submitted, validate the input and call the onSave function with the new or updated prompt data. If there are validation errors, set the errors state to display error messages.
    e.preventDefault(); //prefent default behavior of form submission which would cause a page reload
    const newErrors = {}; // Validate form data. If there are validation errors, set the errors state to display error messages.

    if (!formData.title.trim()) { // If the title field is empty, add an error message to the newErrors object for the title field.
      newErrors.title = 'Title is required'; // If the title field is empty, add an error message to the newErrors object for the title field.
    }
    if (!formData.text.trim()) { // If the text field is empty, add an error message to the newErrors object for the text field.
      newErrors.text = 'Prompt text is required'; // If the text field is empty, add an error message to the newErrors object for the text field.
    }

    if (Object.keys(newErrors).length > 0) { // If there are any validation errors, set the errors state to the newErrors object and return early to prevent calling onSave.
      setErrors(newErrors);
      return;
    }

    onSave({
      ...formData,
      id: promptToEdit ? promptToEdit.id : Date.now().toString(), // If we're editing an existing prompt, keep its ID. If it's a new prompt, generate a unique ID using the current timestamp.
    });
  };

  const isFormValid = formData.title.trim() && formData.text.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--pw-lilac)] to-[var(--pw-white)] dark:from-[var(--pw-dark)] dark:to-[var(--pw-lilac)] p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-[var(--pw-white)] dark:bg-[var(--pw-dark)] rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-[var(--pw-dark)] dark:text-[var(--pw-white)]">
          {promptToEdit ? ' Edit Prompt' : ' New Prompt'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title Field */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-[var(--pw-dark)] dark:text-[var(--pw-white)]">
                 Prompt Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter prompt title"
className={`border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--pw-green)] dark:bg-[var(--pw-dark)] dark:border-gray-600 dark:text-[var(--pw-white)] dark:focus:ring-[var(--pw-green)] font-medium transition ${
                errors.title ? 'border-[var(--pw-lilac)] focus:ring-[var(--pw-lilac)]' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.title && <span className="text-red-500 text-sm mt-2 font-medium"> {errors.title}</span>}
          </div>

          {/* Prompt Text Field */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-[var(--pw-dark)] dark:text-[var(--pw-white)]">
                 Prompt Text with Variables
            </label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows="8"
              placeholder="Enter prompt text with variables like [language] or [topic]"
              className={`border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--pw-green)] dark:bg-[var(--pw-dark)] dark:border-gray-600 dark:text-[var(--pw-white)] dark:focus:ring-[var(--pw-green)] font-medium transition resize-none ${
                errors.text ? 'border-[var(--pw-lilac)] focus:ring-[var(--pw-lilac)]' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.text && <span className="text-red-500 text-sm mt-2 font-medium"> {errors.text}</span>}
            <p className="text-sm text-[var(--pw-dark)] dark:text-[var(--pw-lilac)] mt-2">
                Example: "Explain [topic] to me as if you were a [language] teacher"
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex-1 px-6 py-3 text-white rounded-lg font-semibold transition transform ${
                isFormValid
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:scale-105 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              {promptToEdit ? ' Update Prompt' : ' Save Prompt'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-gray-400 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-500 dark:hover:bg-gray-500 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptForm; // export promptform component
