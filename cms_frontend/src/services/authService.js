import api, { tokenStorage } from './axios'

export const authService = {
  async login(credentials) {
    const response = await api.post('/auth/login/', credentials)
    tokenStorage.setTokens(response.data)
    return response.data
  },
  logout() {
    tokenStorage.clearTokens()
  },
  getStoredTokens() {
    return {
      access: tokenStorage.getAccessToken(),
      refresh: tokenStorage.getRefreshToken(),
    }
  },
}
