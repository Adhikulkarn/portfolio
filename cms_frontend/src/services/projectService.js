import api from './axios'

const normalizeProject = (project) => ({
  id: project.id,
  title: project.title || '',
  description: project.description || '',
  technologies: project.tech_stack || project.technologies || '',
  github_url: project.github_url || '',
  live_url: project.live_url || '',
  featured: Boolean(project.featured),
  image_url: project.cover_image || project.image_url || '',
})

const normalizeList = (data) => {
  const projects = Array.isArray(data) ? data : data?.results || []
  return projects.map(normalizeProject)
}

const toProjectFormData = (project) => {
  const formData = new FormData()
  formData.append('title', project.title || '')
  formData.append('description', project.description || '')
  formData.append('tech_stack', project.technologies || '')
  formData.append('github_url', project.github_url || '')
  formData.append('live_url', project.live_url || '')
  formData.append('featured', project.featured ? 'true' : 'false')

  if (project.cover_image_file) {
    formData.append('cover_image', project.cover_image_file)
  }
  return formData
}

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
    const formData = toProjectFormData(project)
    const response = await api.post('/projects/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return normalizeProject(response.data)
  },
  async updateProject(id, project) {
    const formData = toProjectFormData(project)
    // If no new cover image file was selected, delete the empty cover_image key from the FormData
    // and use PATCH for partial updates, preserving the existing cover image on the backend.
    if (!project.cover_image_file) {
      formData.delete('cover_image')
    }

    const response = await api.patch(`/projects/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return normalizeProject(response.data)
  },
  async deleteProject(id) {
    await api.delete(`/projects/${id}/`)
  },
}
