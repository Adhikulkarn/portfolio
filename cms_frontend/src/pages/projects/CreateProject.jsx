import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProjectForm from '../../components/projects/ProjectForm'
import { projectService } from '../../services/projectService'

function CreateProject() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (project) => {
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await projectService.createProject(project)
      setSuccessMessage('Project created successfully.')
      setTimeout(() => navigate('/projects'), 500)
    } catch {
      setErrorMessage('Unable to create project.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="max-w-5xl">
      <div className="mb-6">
        <Link to="/projects" className="text-sm font-medium text-slate-600 hover:text-slate-950">
          Back to projects
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-slate-950">Create Project</h1>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <ProjectForm
          submitLabel="Create project"
          isSubmitting={isSubmitting}
          successMessage={successMessage}
          errorMessage={errorMessage}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  )
}

export default CreateProject
