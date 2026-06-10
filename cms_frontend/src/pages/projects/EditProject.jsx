import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ProjectForm from '../../components/projects/ProjectForm'
import { projectService } from '../../services/projectService'

function EditProject() {
  const [project, setProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const loadProject = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const data = await projectService.getProject(id)
        if (isMounted) {
          setProject(data)
        }
      } catch {
        if (isMounted) {
          setErrorMessage('Unable to load project.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProject()

    return () => {
      isMounted = false
    }
  }, [id])

  const handleSubmit = async (updatedProject) => {
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const savedProject = await projectService.updateProject(id, updatedProject)
      setProject(savedProject)
      setSuccessMessage('Project updated successfully.')
      setTimeout(() => navigate('/projects'), 500)
    } catch {
      setErrorMessage('Unable to update project.')
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
        <h1 className="mt-3 text-2xl font-semibold text-slate-950">Edit Project</h1>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {isLoading ? (
          <LoadingSpinner label="Loading project" />
        ) : project ? (
          <ProjectForm
            initialValues={project}
            submitLabel="Update project"
            isSubmitting={isSubmitting}
            successMessage={successMessage}
            errorMessage={errorMessage}
            onSubmit={handleSubmit}
          />
        ) : (
          <p className="text-sm text-red-600">{errorMessage || 'Project not found.'}</p>
        )}
      </div>
    </section>
  )
}

export default EditProject
