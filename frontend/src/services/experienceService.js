import api from './axios';

export const experienceService = {
  getExperience: async () => {
    try {
      const response = await api.get('experience/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
      throw error;
    }
  },
};
