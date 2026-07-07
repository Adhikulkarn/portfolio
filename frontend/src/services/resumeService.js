import api from './axios';

export const resumeService = {
  getCurrentResume: async () => {
    try {
      const response = await api.get('resume/current/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
