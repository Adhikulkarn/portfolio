import { useEffect, useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { blogService } from '../../services/blogService'
import { experienceService } from '../../services/experienceService'
import { messageService } from '../../services/messageService'
import { projectService } from '../../services/projectService'
import { resumeService } from '../../services/resumeService'
import { skillService } from '../../services/skillService'

const emptyCounts = {
  projects: 0,
  blogs: 0,
  skills: 0,
  experiences: 0,
  messages: 0,
  resumes: 0,
}

function formatDate(value) {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}

function Dashboard() {
  const [counts, setCounts] = useState(emptyCounts)
  const [recentBlogs, setRecentBlogs] = useState([])
  const [recentMessages, setRecentMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadDashboard = async () => {
      try {
        const [
          projects,
          blogs,
          skills,
          experiences,
          messages,
          resumes,
        ] = await Promise.all([
          projectService.getProjects(),
          blogService.getBlogs(),
          skillService.getSkills(),
          experienceService.getExperiences(),
          messageService.getMessages(),
          resumeService.getResumes(),
        ])

        if (isMounted) {
          setCounts({
            projects: projects.length,
            blogs: blogs.length,
            skills: skills.length,
            experiences: experiences.length,
            messages: messages.length,
            resumes: resumes.length,
          })
          setRecentBlogs(blogs.slice(0, 5))
          setRecentMessages(messages.slice(0, 5))
        }
      } catch {
        if (isMounted) {
          setError('Unable to load dashboard summary.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-950">Welcome Admin</h1>
        <p className="mt-1 text-sm text-slate-600">Your portfolio CMS is ready.</p>
      </div>

      {isLoading ? (
        <div className="rounded-lg border border-slate-200 bg-white">
          <LoadingSpinner label="Loading projects" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard label="Total Projects" value={counts.projects} />
            <StatCard label="Total Blogs" value={counts.blogs} />
            <StatCard label="Total Skills" value={counts.skills} />
            <StatCard label="Total Experiences" value={counts.experiences} />
            <StatCard label="Total Messages" value={counts.messages} />
            <StatCard label="Total Resumes" value={counts.resumes} />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <RecentList title="Recent Blogs" emptyLabel="No recent blogs.">
              {recentBlogs.map((blog) => (
                <li key={blog.id} className="border-b border-slate-100 py-3 last:border-0">
                  <p className="font-medium text-slate-950">{blog.title}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {blog.published ? 'Published' : 'Draft'} · {formatDate(blog.created_at)}
                  </p>
                </li>
              ))}
            </RecentList>

            <RecentList title="Recent Messages" emptyLabel="No recent messages.">
              {recentMessages.map((message) => (
                <li key={message.id} className="border-b border-slate-100 py-3 last:border-0">
                  <p className="font-medium text-slate-950">{message.name}</p>
                  <p className="mt-1 break-all text-sm text-slate-500">{message.email}</p>
                </li>
              ))}
            </RecentList>
          </div>
        </div>
      )}

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
    </section>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
    </div>
  )
}

function RecentList({ title, emptyLabel, children }) {
  const hasItems = Array.isArray(children) ? children.length > 0 : Boolean(children)

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      {hasItems ? (
        <ul className="mt-3 divide-y divide-slate-100">{children}</ul>
      ) : (
        <p className="mt-4 text-sm text-slate-600">{emptyLabel}</p>
      )}
    </div>
  )
}

export default Dashboard
