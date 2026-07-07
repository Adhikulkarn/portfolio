import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  console.warn(
    'VITE_API_BASE_URL environment variable is undefined. ' +
    'API queries will fall back to production endpoint: https://portfolio-2xcz.onrender.com/api'
  );
}

const fallbackUrl = 'https://portfolio-2xcz.onrender.com/api';
const finalUrl = apiBaseUrl || fallbackUrl;

const api = axios.create({
  baseURL: finalUrl.endsWith('/') ? finalUrl : `${finalUrl}/`,
  timeout: 15000, // 15 seconds to accommodate backend cold starts on Render
  headers: {
    'Content-Type': 'application/json',
  },
});

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;

// Centralized Interceptor with retry capability for network issues and 5xx errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;

    // If request configuration is not present, reject immediately
    if (!config) {
      return Promise.reject(error);
    }

    // Setup retry count state
    config.__retryCount = config.__retryCount || 0;

    // Determine retry candidacy (network failures, timeouts, and server 5xx errors)
    const isRetryableError =
      !error.response || 
      (error.response.status >= 500 && error.response.status <= 599);

    const hasRetriesLeft = config.__retryCount < MAX_RETRIES;

    if (isRetryableError && hasRetriesLeft) {
      config.__retryCount += 1;
      
      console.warn(
        `API failure: "${error.message}". Retrying request (${config.__retryCount}/${MAX_RETRIES}) in ${RETRY_DELAY_MS}ms...`
      );

      // Delay execution
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));

      // Re-trigger the request
      return api(config);
    }

    // Forward the error if not retryable or retries depleted
    return Promise.reject(error);
  }
);

export default api;
