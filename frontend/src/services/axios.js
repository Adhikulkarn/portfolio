import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://portfolio-2xcz.onrender.com/api';

const api = axios.create({
  baseURL: apiBaseUrl.endsWith('/') ? apiBaseUrl : `${apiBaseUrl}/`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
