import Store from 'electron-store';

// Initialiser le store avec un schéma de validation
const store = new Store({
  name: 'prompt-wallet-store',
  defaults: {
    prompts: [],
  },
  schema: {
    prompts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          text: { type: 'string' }
        },
        required: ['id', 'title', 'text']
      }
    }
  }
});

export default store;
