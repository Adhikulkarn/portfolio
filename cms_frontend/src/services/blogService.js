import api from './axios'

const normalizeBlog = (blog) => ({
  id: blog.id,
  title: blog.title || '',
  content: blog.content || '',
  cover_image: blog.cover_image || '',
  tags: blog.tags || '',
  published: Boolean(blog.published),
  created_at: blog.created_at || '',
})

const normalizeList = (data) => {
  const blogs = Array.isArray(data) ? data : data?.results || []
  return blogs.map(normalizeBlog)
}

const toBlogPayload = (blog) => ({
  title: blog.title,
  content: blog.content,
  cover_image: blog.cover_image,
  tags: blog.tags,
  published: Boolean(blog.published),
})

export const blogService = {
  async getBlogs() {
    const response = await api.get('blogs/')
    return normalizeList(response.data)
  },
  async getBlog(id) {
    const response = await api.get(`blogs/${id}/`)
    return normalizeBlog(response.data)
  },
  async createBlog(blog) {
    const response = await api.post('blogs/', toBlogPayload(blog))
    return normalizeBlog(response.data)
  },
  async updateBlog(id, blog) {
    const response = await api.put(`blogs/${id}/`, toBlogPayload(blog))
    return normalizeBlog(response.data)
  },
  async deleteBlog(id) {
    await api.delete(`blogs/${id}/`)
  },
}
