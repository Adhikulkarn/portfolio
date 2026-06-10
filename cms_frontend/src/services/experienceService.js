import api from './axios'

const normalizeExperience = (experience) => ({
  id: experience.id,
  role: experience.role || '',
  organization: experience.organization || '',
  duration: experience.duration || '',
  description: experience.description || '',
})

const normalizeList = (data) => {
  const experiences = Array.isArray(data) ? data : data?.results || []
  return experiences.map(normalizeExperience)
}

const toExperiencePayload = (experience) => ({
  role: experience.role,
  organization: experience.organization,
  duration: experience.duration,
  description: experience.description,
})

export const experienceService = {
  async getExperiences() {
    const response = await api.get('/experience/')
    return normalizeList(response.data)
  },
  async createExperience(experience) {
    const response = await api.post('/experience/', toExperiencePayload(experience))
    return normalizeExperience(response.data)
  },
  async updateExperience(id, experience) {
    const response = await api.put(
      `/experience/${id}/`,
      toExperiencePayload(experience),
    )
    return normalizeExperience(response.data)
  },
  async deleteExperience(id) {
    await api.delete(`/experience/${id}/`)
  },
}
