import { useState } from 'react'

const emptyBlog = {
  title: '',
  content: '',
  cover_image: '',
  tags: '',
  published: false,
}

function BlogForm({
  initialValues = emptyBlog,
  submitLabel = 'Save blog',
  isSubmitting = false,
  successMessage = '',
  errorMessage = '',
  onSubmit,
}) {
  const [formData, setFormData] = useState({ ...emptyBlog, ...initialValues })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const nextErrors = {}

    if (!formData.title.trim()) {
      nextErrors.title = 'Title is required.'
    }

    if (!formData.content.trim()) {
      nextErrors.content = 'Content is required.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    onSubmit(formData)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {successMessage ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
        />
        {errors.title ? <p className="mt-2 text-sm text-red-600">{errors.title}</p> : null}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-slate-700">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows="12"
          value={formData.content}
          onChange={handleChange}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
        />
        {errors.content ? (
          <p className="mt-2 text-sm text-red-600">{errors.content}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="cover_image" className="block text-sm font-medium text-slate-700">
          Cover Image URL
        </label>
        <input
          id="cover_image"
          name="cover_image"
          type="url"
          value={formData.cover_image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-slate-700">
          Tags
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          value={formData.tags}
          onChange={handleChange}
          placeholder="react, tailwind, tutorial"
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
        />
        <p className="mt-1 text-xs text-slate-500">Comma-separated values.</p>
      </div>

      <label className="flex w-fit items-center gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">
        <input
          name="published"
          type="checkbox"
          checked={formData.published}
          onChange={handleChange}
          className="h-4 w-4 rounded border-slate-300"
        />
        Published
      </label>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default BlogForm
