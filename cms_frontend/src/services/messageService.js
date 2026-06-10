import api from './axios'

const normalizeMessage = (message) => ({
  id: message.id,
  name: message.name || '',
  email: message.email || '',
  subject: message.subject || '',
  message: message.message || '',
  created_at: message.created_at || '',
})

const normalizeList = (data) => {
  const messages = Array.isArray(data) ? data : data?.results || []
  return messages.map(normalizeMessage)
}

export const messageService = {
  async getMessages() {
    const response = await api.get('/contact/')
    return normalizeList(response.data)
  },
  async deleteMessage(id) {
    await api.delete(`/contact/${id}/`)
  },
}
