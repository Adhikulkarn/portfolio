import api from './axios';

export const projectService = {
  getProjects: async () => {
    try {
      const response = await api.get('projects/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  },
};
