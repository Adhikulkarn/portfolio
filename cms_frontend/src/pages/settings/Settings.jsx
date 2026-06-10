import { useState } from 'react'

const SETTINGS_KEY = 'cms_admin_settings'

const emptySettings = {
  fullName: '',
  email: '',
  linkedinUrl: '',
  githubUrl: '',
}

const loadSettings = () => {
  try {
    const storedSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY))
    return { ...emptySettings, ...storedSettings }
  } catch {
    return emptySettings
  }
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

function Settings() {
  const [formData, setFormData] = useState(loadSettings)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const validate = () => {
    const nextErrors = {}

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.'
    }

    if (!isValidUrl(formData.linkedinUrl)) {
      nextErrors.linkedinUrl = 'Enter a valid URL.'
    }

    if (!isValidUrl(formData.githubUrl)) {
      nextErrors.githubUrl = 'Enter a valid URL.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setSuccessMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    localStorage.setItem(SETTINGS_KEY, JSON.stringify(formData))
    setSuccessMessage('Settings saved successfully.')
  }

  return (
    <section className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-950">Settings</h1>
        <p className="mt-1 text-sm text-slate-600">Manage local admin preferences.</p>
      </div>

      <form
        className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        onSubmit={handleSubmit}
        noValidate
      >
        {successMessage ? (
          <div className="mb-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-2">
          <Field label="Full Name" name="fullName" error={errors.fullName}>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </Field>

          <Field label="Email" name="email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </Field>

          <Field label="LinkedIn URL" name="linkedinUrl" error={errors.linkedinUrl}>
            <input
              id="linkedinUrl"
              name="linkedinUrl"
              type="url"
              value={formData.linkedinUrl}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </Field>

          <Field label="GitHub URL" name="githubUrl" error={errors.githubUrl}>
            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              value={formData.githubUrl}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </Field>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Save settings
          </button>
        </div>
      </form>
    </section>
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

export default Settings
