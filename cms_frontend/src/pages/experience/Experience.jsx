import { useEffect, useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ExperienceForm from '../../components/experience/ExperienceForm'
import ExperienceTable from '../../components/experience/ExperienceTable'
import { experienceService } from '../../services/experienceService'

function Experience() {
  const [experiences, setExperiences] = useState([])
  const [editingExperience, setEditingExperience] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeletingId, setIsDeletingId] = useState(null)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadExperiences = async () => {
      setIsLoading(true)
      setError('')

      try {
        const data = await experienceService.getExperiences()
        if (isMounted) {
          setExperiences(data)
        }
      } catch {
        if (isMounted) {
          setError('Unable to load experiences.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadExperiences()

    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmit = async (experience) => {
    setIsSubmitting(true)
    setError('')
    setSuccessMessage('')

    try {
      if (editingExperience) {
        const updatedExperience = await experienceService.updateExperience(
          editingExperience.id,
          experience,
        )
        setExperiences((current) =>
          current.map((item) =>
            item.id === updatedExperience.id ? updatedExperience : item,
          ),
        )
        setEditingExperience(null)
        setSuccessMessage('Experience updated successfully.')
      } else {
        const createdExperience = await experienceService.createExperience(experience)
        setExperiences((current) => [createdExperience, ...current])
        setSuccessMessage('Experience created successfully.')
      }
    } catch {
      setError(
        editingExperience
          ? 'Unable to update experience.'
          : 'Unable to create experience.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (experience) => {
    setIsDeletingId(experience.id)
    setError('')
    setSuccessMessage('')

    try {
      await experienceService.deleteExperience(experience.id)
      setExperiences((current) => current.filter((item) => item.id !== experience.id))
      if (editingExperience?.id === experience.id) {
        setEditingExperience(null)
      }
      setSuccessMessage('Experience deleted successfully.')
    } catch {
      setError('Unable to delete experience.')
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Experience</h1>
        <p className="mt-1 text-sm text-slate-600">Manage professional experience entries.</p>
      </div>

      <ExperienceForm
        key={editingExperience?.id || 'create'}
        initialValues={editingExperience || undefined}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onCancel={() => setEditingExperience(null)}
      />

      {successMessage ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-lg border border-slate-200 bg-white">
          <LoadingSpinner label="Loading experiences" />
        </div>
      ) : (
        <ExperienceTable
          experiences={experiences}
          onEdit={setEditingExperience}
          onDelete={handleDelete}
          isDeletingId={isDeletingId}
        />
      )}
    </section>
  )
}

export default Experience
