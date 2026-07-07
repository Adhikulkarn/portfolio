import api from './axios';

export const blogService = {
  getBlogs: async () => {
    try {
      const response = await api.get('blogs/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      throw error;
    }
  },

  getBlogBySlug: async (slug) => {
    try {
      const response = await api.get(`blogs/${slug}/`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch blog with slug "${slug}":`, error);
      throw error;
    }
  },
};
