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

  getProjectBySlug: async (slug) => {
    try {
      const response = await api.get(`projects/${slug}/`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch project with slug "${slug}":`, error);
      throw error;
    }
  },
};
