import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlogForm from '../../components/blogs/BlogForm'
import { blogService } from '../../services/blogService'
import { getErrorMessage } from '../../services/errorUtils'

function CreateBlog() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (blog) => {
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await blogService.createBlog(blog)
      setSuccessMessage('Blog created successfully.')
      setTimeout(() => navigate('/blogs'), 500)
    } catch (error) {
      setErrorMessage(getErrorMessage(error, 'Unable to create blog.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="max-w-5xl">
      <div className="mb-6">
        <Link to="/blogs" className="text-sm font-medium text-slate-600 hover:text-slate-950">
          Back to blogs
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-slate-950">Create Blog</h1>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <BlogForm
          submitLabel="Create blog"
          isSubmitting={isSubmitting}
          successMessage={successMessage}
          errorMessage={errorMessage}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  )
}

export default CreateBlog
