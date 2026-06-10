import axios from 'axios'

const ACCESS_TOKEN_KEY = 'cms_access_token'
const REFRESH_TOKEN_KEY = 'cms_refresh_token'

const rawBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
const baseURL = rawBaseURL.endsWith('/') ? rawBaseURL : `${rawBaseURL}/`

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshing = false
let refreshSubscribers = []

const notifyRefreshSubscribers = (token) => {
  refreshSubscribers.forEach((callback) => callback(token))
  refreshSubscribers = []
}

const subscribeToRefresh = (callback) => {
  refreshSubscribers.push(callback)
}

export const tokenStorage = {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  },
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },
  setTokens({ access, refresh }) {
    if (access) {
      localStorage.setItem(ACCESS_TOKEN_KEY, access)
    }
    if (refresh) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
    }
  },
  clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
}

api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status !== 401 || originalRequest?._retry) {
      return Promise.reject(error)
    }

    const refreshToken = tokenStorage.getRefreshToken()

    if (!refreshToken) {
      tokenStorage.clearTokens()
      return Promise.reject(error)
    }

    originalRequest._retry = true

    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeToRefresh((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          resolve(api(originalRequest))
        })
      })
    }

    isRefreshing = true

    try {
      const response = await axios.post(
        `${api.defaults.baseURL}/auth/refresh/`,
        { refresh: refreshToken },
      )
      const newAccessToken = response.data.access

      tokenStorage.setTokens({ access: newAccessToken })
      notifyRefreshSubscribers(newAccessToken)
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

      return api(originalRequest)
    } catch (refreshError) {
      tokenStorage.clearTokens()
      refreshSubscribers = []
      window.dispatchEvent(new Event('auth:logout'))
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

export default api
