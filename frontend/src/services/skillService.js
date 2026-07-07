import api from './axios';

export const skillService = {
  getSkills: async () => {
    try {
      const response = await api.get('skills/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch skills:', error);
      throw error;
    }
  },
};
