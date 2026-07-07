import api from './axios';

export const contactService = {
  submitContactForm: async (formData) => {
    try {
      const response = await api.post('contact/', formData);
      return response.data;
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      throw error;
    }
  },
};
