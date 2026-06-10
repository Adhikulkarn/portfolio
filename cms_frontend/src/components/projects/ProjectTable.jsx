function ProjectTable({ projects, onEdit, onDelete }) {
  if (!projects.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-sm font-medium text-slate-700">No projects found.</p>
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
                Project
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500 md:table-cell">
                Technologies
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500 lg:table-cell">
                Featured
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {projects.map((project) => (
              <tr key={project.id} className="align-top">
                <td className="px-4 py-4">
                  <div className="flex gap-3">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt=""
                        className="h-12 w-12 rounded-md object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-md bg-slate-100" />
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-slate-950">{project.title}</p>
                      <p className="mt-1 line-clamp-2 max-w-xl text-sm text-slate-600">
                        {project.description}
                      </p>
                      <p className="mt-2 text-xs text-slate-500 md:hidden">
                        {project.technologies || 'No technologies'}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-4 text-sm text-slate-600 md:table-cell">
                  {project.technologies || '-'}
                </td>
                <td className="hidden px-4 py-4 lg:table-cell">
                  <span
                    className={[
                      'inline-flex rounded-full px-2 py-1 text-xs font-medium',
                      project.featured
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600',
                    ].join(' ')}
                  >
                    {project.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(project)}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(project)}
                      className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
                    >
                      Delete
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

export default ProjectTable
