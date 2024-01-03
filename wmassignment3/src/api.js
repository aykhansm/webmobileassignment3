const API_BASE_URL = 'http://localhost:3001';

const api = {
  getFlashCards: async () => {
    const response = await fetch(`${API_BASE_URL}/cards`);
    const data = await response.json();
    return data;
  },

  getFlashCardById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/cards/${id}`);
    const data = await response.json();
    return data;
  },

  createFlashCard: async (flashCard) => {
    const currentDateTime = new Date().toISOString();

    const cardWithTimestamp = {
      ...flashCard,
      lastModified: currentDateTime,
    };

    const response = await fetch(`${API_BASE_URL}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardWithTimestamp),
    });

    const data = await response.json();
    return data;
  },

  updateFlashCard: async (id, updatedFlashCard) => {
    const currentDateTime = new Date().toISOString();

    const updatedCardWithTimestamp = {
      ...updatedFlashCard,
      lastModified: currentDateTime,
    };

    const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCardWithTimestamp),
    });

    const data = await response.json();
    return data;
  },

  deleteFlashCard: async (id) => {
    const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  },

  getMessages: async () => {
    const response = await fetch(`${API_BASE_URL}/messages`);
    const data = await response.json();
    return data;
  },

  createMessage: async (message) => {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();
    return data;
  },
};

export default api;
