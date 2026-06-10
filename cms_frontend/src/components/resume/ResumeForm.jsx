import { useState } from 'react'

const emptyResume = {
  title: '',
  resume_url: '',
  active: false,
}

const isValidUrl = (value) => {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

function ResumeForm({ isSubmitting, onSubmit }) {
  const [formData, setFormData] = useState(emptyResume)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const nextErrors = {}

    if (!formData.title.trim()) {
      nextErrors.title = 'Title is required.'
    }

    if (!formData.resume_url.trim()) {
      nextErrors.resume_url = 'Resume URL is required.'
    } else if (!isValidUrl(formData.resume_url)) {
      nextErrors.resume_url = 'Enter a valid URL.'
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

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    await onSubmit(formData)
    setFormData(emptyResume)
  }

  return (
    <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" onSubmit={handleSubmit} noValidate>
      <h2 className="text-lg font-semibold text-slate-950">Add Resume</h2>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <label htmlFor="resume-title" className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="resume-title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
          {errors.title ? <p className="mt-2 text-sm text-red-600">{errors.title}</p> : null}
        </div>

        <div>
          <label htmlFor="resume_url" className="block text-sm font-medium text-slate-700">
            Resume URL
          </label>
          <input
            id="resume_url"
            name="resume_url"
            type="url"
            value={formData.resume_url}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
          {errors.resume_url ? (
            <p className="mt-2 text-sm text-red-600">{errors.resume_url}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex w-fit items-center gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">
          <input
            name="active"
            type="checkbox"
            checked={formData.active}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300"
          />
          Mark active
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Saving...' : 'Add resume'}
        </button>
      </div>
    </form>
  )
}

export default ResumeForm
