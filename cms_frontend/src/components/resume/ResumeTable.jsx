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

function ResumeTable({ resumes, onActivate, onDelete, isUpdatingId, isDeletingId }) {
  if (!resumes.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-sm font-medium text-slate-700">No resumes found.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Resume
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500 md:table-cell">
                Uploaded
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {resumes.map((resume) => (
              <tr key={resume.id} className="align-top">
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-slate-950">{resume.title}</p>
                      {resume.active ? (
                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                          Active
                        </span>
                      ) : null}
                    </div>
                    <a
                      href={resume.resume_url}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all text-sm text-slate-600 hover:text-slate-950"
                    >
                      {resume.resume_url}
                    </a>
                    <p className="text-xs text-slate-500 md:hidden">
                      Uploaded {formatDate(resume.uploaded_at)}
                    </p>
                  </div>
                </td>
                <td className="hidden px-4 py-4 text-sm text-slate-600 md:table-cell">
                  {formatDate(resume.uploaded_at)}
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => onActivate(resume)}
                      disabled={resume.active || isUpdatingId === resume.id}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isUpdatingId === resume.id ? 'Updating...' : 'Set active'}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(resume)}
                      disabled={isDeletingId === resume.id}
                      className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-70"
                    >
                      {isDeletingId === resume.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ResumeTable
