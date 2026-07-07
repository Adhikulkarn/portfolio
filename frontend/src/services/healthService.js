import api from './axios';

export const healthService = {
  checkHealth: async () => {
    try {
      const response = await api.get('health/');
      // Django health check returns "OK" string or similar
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },
};
