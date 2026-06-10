import api from './axios'

const normalizeProject = (project) => ({
  id: project.id,
  title: project.title || '',
  description: project.description || '',
  technologies: project.technologies ?? project.tech_stack ?? '',
  github_url: project.github_url || '',
  live_url: project.live_url || '',
  featured: Boolean(project.featured),
  image_url: project.image_url ?? project.cover_image ?? '',
})

const normalizeList = (data) => {
  const projects = Array.isArray(data) ? data : data?.results || []
  return projects.map(normalizeProject)
}

const toProjectPayload = (project) => ({
  title: project.title,
  description: project.description,
  technologies: project.technologies,
  github_url: project.github_url,
  live_url: project.live_url,
  featured: Boolean(project.featured),
  image_url: project.image_url,
})

const toFallbackProjectPayload = (project) => ({
  title: project.title,
  description: project.description,
  tech_stack: project.technologies,
  github_url: project.github_url,
  live_url: project.live_url,
  featured: Boolean(project.featured),
  cover_image: project.image_url,
})

const shouldRetryWithFallback = (error) => error.response?.status === 400

export const projectService = {
  async getProjects() {
    const response = await api.get('/projects/')
    return normalizeList(response.data)
  },
  async getProject(id) {
    const response = await api.get(`/projects/${id}/`)
    return normalizeProject(response.data)
  },
  async createProject(project) {
    try {
      const response = await api.post('/projects/', toProjectPayload(project))
      return normalizeProject(response.data)
    } catch (error) {
      if (!shouldRetryWithFallback(error)) {
        throw error
      }

      const response = await api.post('/projects/', toFallbackProjectPayload(project))
      return normalizeProject(response.data)
    }
  },
  async updateProject(id, project) {
    try {
      const response = await api.put(`/projects/${id}/`, toProjectPayload(project))
      return normalizeProject(response.data)
    } catch (error) {
      if (!shouldRetryWithFallback(error)) {
        throw error
      }

      const response = await api.put(
        `/projects/${id}/`,
        toFallbackProjectPayload(project),
      )
      return normalizeProject(response.data)
    }
  },
  async deleteProject(id) {
    await api.delete(`/projects/${id}/`)
  },
}
