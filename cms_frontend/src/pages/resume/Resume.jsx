import { useEffect, useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ResumeForm from '../../components/resume/ResumeForm'
import ResumeTable from '../../components/resume/ResumeTable'
import { resumeService } from '../../services/resumeService'
import { getErrorMessage } from '../../services/errorUtils'

function Resume() {
  const [resumes, setResumes] = useState([])
  const [currentResume, setCurrentResume] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUpdatingId, setIsUpdatingId] = useState(null)
  const [isDeletingId, setIsDeletingId] = useState(null)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadResumes = async () => {
      setIsLoading(true)
      setError('')

      try {
        const [data, activeResume] = await Promise.all([
          resumeService.getResumes(),
          resumeService.getCurrentResume().catch(() => null),
        ])
        if (isMounted) {
          setResumes(data)
          setCurrentResume(activeResume)
        }
      } catch (error) {
        if (isMounted) {
          setError(getErrorMessage(error, 'Unable to load resumes.'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadResumes()

    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmit = async (resume) => {
    setIsSubmitting(true)
    setError('')
    setSuccessMessage('')

    try {
      const createdResume = await resumeService.createResume(resume)
      setResumes((current) => [
        createdResume,
        ...current.map((item) =>
          createdResume.active ? { ...item, active: false } : item,
        ),
      ])
      if (createdResume.active) {
        setCurrentResume(createdResume)
      }
      setSuccessMessage('Resume added successfully.')
    } catch (error) {
      setError(getErrorMessage(error, 'Unable to add resume.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleActivate = async (resume) => {
    setIsUpdatingId(resume.id)
    setError('')
    setSuccessMessage('')

    try {
      const updatedResume = await resumeService.updateResume(resume.id, {
        ...resume,
        active: true,
      })
      setResumes((current) =>
        current.map((item) => ({
          ...item,
          active: item.id === updatedResume.id,
        })),
      )
      setCurrentResume(updatedResume)
      setSuccessMessage('Active resume updated successfully.')
    } catch (error) {
      setError(getErrorMessage(error, 'Unable to mark resume active.'))
    } finally {
      setIsUpdatingId(null)
    }
  }

  const handleDelete = async (resume) => {
    setIsDeletingId(resume.id)
    setError('')
    setSuccessMessage('')

    try {
      await resumeService.deleteResume(resume.id)
      setResumes((current) => current.filter((item) => item.id !== resume.id))
      if (currentResume?.id === resume.id) {
        setCurrentResume(null)
      }
      setSuccessMessage('Resume deleted successfully.')
    } catch (error) {
      setError(getErrorMessage(error, 'Unable to delete resume.'))
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <section className="space-y-6">
...
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Resume</h1>
        <p className="mt-1 text-sm text-slate-600">Manage resume links and active preview.</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Current Active Resume</p>
        {currentResume ? (
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-slate-950">{currentResume.title}</p>
              <a
                href={currentResume.resume_url}
                target="_blank"
                rel="noreferrer"
                className="break-all text-sm text-slate-600 hover:text-slate-950"
              >
                {currentResume.resume_url}
              </a>
            </div>
            <a
              href={currentResume.resume_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Preview
            </a>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-600">No active resume selected.</p>
        )}
      </div>

      <ResumeForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />

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
          <LoadingSpinner label="Loading resumes" />
        </div>
      ) : (
        <ResumeTable
          resumes={resumes}
          onActivate={handleActivate}
          onDelete={handleDelete}
          isUpdatingId={isUpdatingId}
          isDeletingId={isDeletingId}
        />
      )}
    </section>
  )
}

export default Resume
