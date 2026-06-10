import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BlogForm from '../../components/blogs/BlogForm'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { blogService } from '../../services/blogService'
import { getErrorMessage } from '../../services/errorUtils'

function EditBlog() {
  const [blog, setBlog] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const loadBlog = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const data = await blogService.getBlog(id)
        if (isMounted) {
          setBlog(data)
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(getErrorMessage(error, 'Unable to load blog.'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadBlog()

    return () => {
      isMounted = false
    }
  }, [id])

  const handleSubmit = async (updatedBlog) => {
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const savedBlog = await blogService.updateBlog(id, updatedBlog)
      setBlog(savedBlog)
      setSuccessMessage('Blog updated successfully.')
      setTimeout(() => navigate('/blogs'), 500)
    } catch (error) {
      setErrorMessage(getErrorMessage(error, 'Unable to update blog.'))
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
        <h1 className="mt-3 text-2xl font-semibold text-slate-950">Edit Blog</h1>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {isLoading ? (
          <LoadingSpinner label="Loading blog" />
        ) : blog ? (
          <BlogForm
            initialValues={blog}
            submitLabel="Update blog"
            isSubmitting={isSubmitting}
            successMessage={successMessage}
            errorMessage={errorMessage}
            onSubmit={handleSubmit}
          />
        ) : (
          <p className="text-sm text-red-600">{errorMessage || 'Blog not found.'}</p>
        )}
      </div>
    </section>
  )
}

export default EditBlog
