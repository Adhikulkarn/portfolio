import api from './axios'

const normalizeResume = (resume) => ({
  id: resume.id,
  title: resume.title || '',
  resume_url: resume.resume_url || '',
  active: Boolean(resume.active),
  uploaded_at: resume.uploaded_at || '',
})

const normalizeList = (data) => {
  const resumes = Array.isArray(data) ? data : data?.results || []
  return resumes.map(normalizeResume)
}

const toResumePayload = (resume) => ({
  title: resume.title,
  resume_url: resume.resume_url,
  active: Boolean(resume.active),
})

export const resumeService = {
  async getResumes() {
    const response = await api.get('resume/')
    return normalizeList(response.data)
  },
  async getCurrentResume() {
    const response = await api.get('resume/current/')
    return normalizeResume(response.data)
  },
  async createResume(resume) {
    const response = await api.post('resume/', toResumePayload(resume))
    return normalizeResume(response.data)
  },
  async updateResume(id, resume) {
    const response = await api.put(`resume/${id}/`, toResumePayload(resume))
    return normalizeResume(response.data)
  },
  async deleteResume(id) {
    await api.delete(`resume/${id}/`)
  },
}
