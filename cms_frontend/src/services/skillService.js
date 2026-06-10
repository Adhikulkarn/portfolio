import api from './axios'

const normalizeSkill = (skill) => ({
  id: skill.id,
  name: skill.name || '',
  category: skill.category || '',
})

const normalizeList = (data) => {
  const skills = Array.isArray(data) ? data : data?.results || []
  return skills.map(normalizeSkill)
}

const toSkillPayload = (skill) => ({
  name: skill.name,
  category: skill.category,
})

export const skillService = {
  async getSkills() {
    const response = await api.get('skills/')
    return normalizeList(response.data)
  },
  async createSkill(skill) {
    const response = await api.post('skills/', toSkillPayload(skill))
    return normalizeSkill(response.data)
  },
  async updateSkill(id, skill) {
    const response = await api.put(`skills/${id}/`, toSkillPayload(skill))
    return normalizeSkill(response.data)
  },
  async deleteSkill(id) {
    await api.delete(`skills/${id}/`)
  },
}
