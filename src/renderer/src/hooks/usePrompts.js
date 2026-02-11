import { useState, useEffect, useCallback } from 'react';

export const usePrompts = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les prompts au montage
  useEffect(() => {
    loadPrompts();
  }, []);

  const loadPrompts = useCallback(async () => {
    try {
      const data = await window.api.store.getPrompts();
      setPrompts(data || []);
    } catch (error) {
      console.error('Error loading prompts:', error);
      // Fallback to localStorage si electron-store échoue
      const localStoragePrompts = JSON.parse(localStorage.getItem('my_prompts') || '[]');
      setPrompts(localStoragePrompts);
    } finally {
      setLoading(false);
    }
  }, []);

  const savePrompt = useCallback(async (prompt) => {
    try {
      const updated = await window.api.store.savePrompt(prompt);
      setPrompts(updated);
      // Aussi sauvegarder dans localStorage comme fallback
      localStorage.setItem('my_prompts', JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error saving prompt:', error);
      throw error;
    }
  }, []);

  const deletePrompt = useCallback(async (id) => {
    try {
      const updated = await window.api.store.deletePrompt(id);
      setPrompts(updated);
      localStorage.setItem('my_prompts', JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error deleting prompt:', error);
      throw error;
    }
  }, []);

  const clearPrompts = useCallback(async () => {
    try {
      await window.api.store.clearPrompts();
      setPrompts([]);
      localStorage.removeItem('my_prompts');
    } catch (error) {
      console.error('Error clearing prompts:', error);
      throw error;
    }
  }, []);

  return {
    prompts,
    loading,
    savePrompt,
    deletePrompt,
    clearPrompts,
    loadPrompts
  };
};
