import { useState } from 'react'

const emptyExperience = {
  role: '',
  organization: '',
  duration: '',
  description: '',
}

function ExperienceForm({ initialValues = emptyExperience, isSubmitting, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({ ...emptyExperience, ...initialValues })
  const [errors, setErrors] = useState({})
  const isEditing = Boolean(initialValues.id)

  const validate = () => {
    const nextErrors = {}

    if (!formData.role.trim()) {
      nextErrors.role = 'Role is required.'
    }

    if (!formData.organization.trim()) {
      nextErrors.organization = 'Organization is required.'
    }

    if (!formData.duration.trim()) {
      nextErrors.duration = 'Duration is required.'
    }

    if (!formData.description.trim()) {
      nextErrors.description = 'Description is required.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
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
    <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" onSubmit={handleSubmit} noValidate>
      <h2 className="text-lg font-semibold text-slate-950">
        {isEditing ? 'Edit Experience' : 'Create Experience'}
      </h2>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Field label="Role" name="role" error={errors.role}>
          <input
            id="role"
            name="role"
            type="text"
            value={formData.role}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </Field>

        <Field label="Organization" name="organization" error={errors.organization}>
          <input
            id="organization"
            name="organization"
            type="text"
            value={formData.organization}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </Field>

        <Field label="Duration" name="duration" error={errors.duration}>
          <input
            id="duration"
            name="duration"
            type="text"
            value={formData.duration}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </Field>
      </div>

      <div className="mt-5">
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
      </div>

      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {isEditing ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-70"
          >
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update experience' : 'Create experience'}
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

export default ExperienceForm
