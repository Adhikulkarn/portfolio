import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import DeleteProjectModal from '../../components/projects/DeleteProjectModal'
import ProjectTable from '../../components/projects/ProjectTable'
import { projectService } from '../../services/projectService'

function Projects() {
  const [projects, setProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [projectToDelete, setProjectToDelete] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return projects
    }

    return projects.filter((project) => project.title.toLowerCase().includes(query))
  }, [projects, searchTerm])

  useEffect(() => {
    let isMounted = true

    const loadProjects = async () => {
      setIsLoading(true)
      setError('')

      try {
        const data = await projectService.getProjects()
        if (isMounted) {
          setProjects(data)
        }
      } catch {
        if (isMounted) {
          setError('Unable to load projects.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProjects()

    return () => {
      isMounted = false
    }
  }, [])

  const handleDelete = async () => {
    if (!projectToDelete) {
      return
    }

    setIsDeleting(true)
    setError('')
    setSuccessMessage('')

    try {
      await projectService.deleteProject(projectToDelete.id)
      setProjects((current) =>
        current.filter((project) => project.id !== projectToDelete.id),
      )
      setSuccessMessage('Project deleted successfully.')
      setProjectToDelete(null)
    } catch {
      setError('Unable to delete project.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">Projects</h1>
          <p className="mt-1 text-sm text-slate-600">Create, update, and remove portfolio projects.</p>
        </div>
        <Link
          to="/projects/new"
          className="inline-flex justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Create Project
        </Link>
      </div>

      <div className="mb-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <label htmlFor="project-search" className="block text-sm font-medium text-slate-700">
          Search by title
        </label>
        <input
          id="project-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search projects"
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
          <LoadingSpinner label="Loading projects" />
        </div>
      ) : (
        <ProjectTable
          projects={filteredProjects}
          onEdit={(project) => navigate(`/projects/edit/${project.id}`)}
          onDelete={setProjectToDelete}
        />
      )}

      <DeleteProjectModal
        project={projectToDelete}
        isDeleting={isDeleting}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleDelete}
      />
    </section>
  )
}

export default Projects
