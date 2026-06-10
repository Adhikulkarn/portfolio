import { useState } from 'react'

const emptySkill = {
  name: '',
  category: '',
}

function SkillForm({ initialValues = emptySkill, isSubmitting, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({ ...emptySkill, ...initialValues })
  const [errors, setErrors] = useState({})

  const isEditing = Boolean(initialValues.id)

  const validate = () => {
    const nextErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required.'
    }

    if (!formData.category.trim()) {
      nextErrors.category = 'Category is required.'
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
        {isEditing ? 'Edit Skill' : 'Create Skill'}
      </h2>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="skill-name" className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="skill-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
          {errors.name ? <p className="mt-2 text-sm text-red-600">{errors.name}</p> : null}
        </div>
      </div>

        <div>
          <label htmlFor="skill-category" className="block text-sm font-medium text-slate-700">
            Category
          </label>

          <select
            id="skill-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          >
            <option value="">Select Category</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="devops">DevOps</option>
            <option value="tools">Tools</option>
            <option value="languages">Languages</option>
            <option value="soft_skills">Soft Skills</option>
          </select>

          {errors.category ? (
            <p className="mt-2 text-sm text-red-600">{errors.category}</p>
          ) : null}
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
            {isSubmitting ? 'Saving...' : isEditing ? 'Update skill' : 'Create skill'}
          </button>
        </div>
    </form>
  )
}

export default SkillForm
