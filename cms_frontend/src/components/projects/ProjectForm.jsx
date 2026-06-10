import { useState } from 'react'

const emptyProject = {
  title: '',
  description: '',
  technologies: '',
  github_url: '',
  live_url: '',
  featured: false,
  image_url: '',
}

const isValidUrl = (value) => {
  if (!value) {
    return true
  }

  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

function ProjectForm({
  initialValues = emptyProject,
  submitLabel = 'Save project',
  isSubmitting = false,
  successMessage = '',
  errorMessage = '',
  onSubmit,
}) {
  const [formData, setFormData] = useState({ ...emptyProject, ...initialValues })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const nextErrors = {}

    if (!formData.title.trim()) {
      nextErrors.title = 'Title is required.'
    }

    if (!formData.description.trim()) {
      nextErrors.description = 'Description is required.'
    }

    if (!formData.technologies.trim()) {
      nextErrors.technologies = 'Technologies are required.'
    }

    if (!isValidUrl(formData.github_url)) {
      nextErrors.github_url = 'Enter a valid URL.'
    }

    if (!isValidUrl(formData.live_url)) {
      nextErrors.live_url = 'Enter a valid URL.'
    }

    if (!isValidUrl(formData.image_url)) {
      nextErrors.image_url = 'Enter a valid URL.'
    }

    if (!formData.image_url.trim()) {
      nextErrors.image_url = 'Image URL is required.'
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

      <div className="grid gap-5 lg:grid-cols-2">
        <Field label="Title" name="title" error={errors.title}>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </Field>

        <Field label="Technologies" name="technologies" error={errors.technologies}>
          <input
            id="technologies"
            name="technologies"
            type="text"
            value={formData.technologies}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </Field>

        <Field label="GitHub URL" name="github_url" error={errors.github_url}>
          <input
            id="github_url"
            name="github_url"
            type="url"
            value={formData.github_url}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </Field>

        <Field label="Live URL" name="live_url" error={errors.live_url}>
          <input
            id="live_url"
            name="live_url"
            type="url"
            value={formData.live_url}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </Field>

        <Field label="Image URL" name="image_url" error={errors.image_url}>
          <input
            id="image_url"
            name="image_url"
            type="url"
            value={formData.image_url}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </Field>

        <div className="flex items-end">
          <label className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">
            <input
              name="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300"
            />
            Featured project
          </label>
        </div>
      </div>

      <Field label="Description" name="description" error={errors.description}>
        <textarea
          id="description"
          name="description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
        />
      </Field>

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

function Field({ label, name, error, children }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  )
}

export default ProjectForm
