import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import BlogTable from '../../components/blogs/BlogTable'
import DeleteBlogModal from '../../components/blogs/DeleteBlogModal'
import { blogService } from '../../services/blogService'
import { getErrorMessage } from '../../services/errorUtils'

function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [blogToDelete, setBlogToDelete] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const filteredBlogs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return blogs
    }

    return blogs.filter((blog) => blog.title.toLowerCase().includes(query))
  }, [blogs, searchTerm])

  useEffect(() => {
    let isMounted = true

    const loadBlogs = async () => {
      setIsLoading(true)
      setError('')

      try {
        const data = await blogService.getBlogs()
        if (isMounted) {
          setBlogs(data)
        }
      } catch (error) {
        if (isMounted) {
          setError(getErrorMessage(error, 'Unable to load blogs.'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadBlogs()

    return () => {
      isMounted = false
    }
  }, [])

  const handleDelete = async () => {
    if (!blogToDelete) {
      return
    }

    setIsDeleting(true)
    setError('')
    setSuccessMessage('')

    try {
      await blogService.deleteBlog(blogToDelete.id)
      setBlogs((current) => current.filter((blog) => blog.id !== blogToDelete.id))
      setSuccessMessage('Blog deleted successfully.')
      setBlogToDelete(null)
    } catch (error) {
      setError(getErrorMessage(error, 'Unable to delete blog.'))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">Blogs</h1>
          <p className="mt-1 text-sm text-slate-600">Manage blog posts and publishing state.</p>
        </div>
        <Link
          to="/blogs/new"
          className="inline-flex justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Create Blog
        </Link>
      </div>

      <div className="mb-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <label htmlFor="blog-search" className="block text-sm font-medium text-slate-700">
          Search by title
        </label>
        <input
          id="blog-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search blogs"
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 sm:max-w-md"
        />
      </div>

      {successMessage ? (
        <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      {error ? (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-lg border border-slate-200 bg-white">
          <LoadingSpinner label="Loading blogs" />
        </div>
      ) : (
        <BlogTable
          blogs={filteredBlogs}
          onEdit={(blog) => navigate(`/blogs/edit/${blog.id}`)}
          onDelete={setBlogToDelete}
        />
      )}

      <DeleteBlogModal
        blog={blogToDelete}
        isDeleting={isDeleting}
        onClose={() => setBlogToDelete(null)}
        onConfirm={handleDelete}
      />
    </section>
  )
}

export default Blogs
