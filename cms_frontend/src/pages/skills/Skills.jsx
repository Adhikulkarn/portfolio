import { useEffect, useMemo, useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import SkillForm from '../../components/skills/SkillForm'
import SkillTable from '../../components/skills/SkillTable'
import { skillService } from '../../services/skillService'
import { getErrorMessage } from '../../services/errorUtils'

function Skills() {
  const [skills, setSkills] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editingSkill, setEditingSkill] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeletingId, setIsDeletingId] = useState(null)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const filteredSkills = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return skills
    }

    return skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query),
    )
  }, [skills, searchTerm])

  useEffect(() => {
    let isMounted = true

    const loadSkills = async () => {
      setIsLoading(true)
      setError('')

      try {
        const data = await skillService.getSkills()
        if (isMounted) {
          setSkills(data)
        }
      } catch (error) {
        if (isMounted) {
          setError(getErrorMessage(error, 'Unable to load skills.'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadSkills()

    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmit = async (skill) => {
    setIsSubmitting(true)
    setError('')
    setSuccessMessage('')

    try {
      if (editingSkill) {
        const updatedSkill = await skillService.updateSkill(editingSkill.id, skill)
        setSkills((current) =>
          current.map((item) => (item.id === updatedSkill.id ? updatedSkill : item)),
        )
        setEditingSkill(null)
        setSuccessMessage('Skill updated successfully.')
      } else {
        const createdSkill = await skillService.createSkill(skill)
        setSkills((current) => [createdSkill, ...current])
        setSuccessMessage('Skill created successfully.')
      }
    } catch (error) {
      setError(getErrorMessage(error, editingSkill ? 'Unable to update skill.' : 'Unable to create skill.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (skill) => {
    setIsDeletingId(skill.id)
    setError('')
    setSuccessMessage('')

    try {
      await skillService.deleteSkill(skill.id)
      setSkills((current) => current.filter((item) => item.id !== skill.id))
      if (editingSkill?.id === skill.id) {
        setEditingSkill(null)
      }
      setSuccessMessage('Skill deleted successfully.')
    } catch (error) {
      setError(getErrorMessage(error, 'Unable to delete skill.'))
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Skills</h1>
        <p className="mt-1 text-sm text-slate-600">Manage portfolio skills and categories.</p>
      </div>

      <SkillForm
        key={editingSkill?.id || 'create'}
        initialValues={editingSkill || undefined}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onCancel={() => setEditingSkill(null)}
      />

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <label htmlFor="skill-search" className="block text-sm font-medium text-slate-700">
          Search skills
        </label>
        <input
          id="skill-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by name or category"
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 sm:max-w-md"
        />
      </div>

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
          <LoadingSpinner label="Loading skills" />
        </div>
      ) : (
        <SkillTable
          skills={filteredSkills}
          onEdit={setEditingSkill}
          onDelete={handleDelete}
          isDeletingId={isDeletingId}
        />
      )}
    </section>
  )
}

export default Skills
