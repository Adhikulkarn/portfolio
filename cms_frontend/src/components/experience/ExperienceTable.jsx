function ExperienceTable({ experiences, onEdit, onDelete, isDeletingId }) {
  if (!experiences.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-sm font-medium text-slate-700">No experiences found.</p>
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
                Role
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500 md:table-cell">
                Duration
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {experiences.map((experience) => (
              <tr key={experience.id} className="align-top">
                <td className="px-4 py-4">
                  <p className="font-medium text-slate-950">{experience.role}</p>
                  <p className="mt-1 text-sm text-slate-600">{experience.organization}</p>
                  <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-slate-500">
                    {experience.description}
                  </p>
                  <p className="mt-2 text-xs text-slate-500 md:hidden">{experience.duration}</p>
                </td>
                <td className="hidden px-4 py-4 text-sm text-slate-600 md:table-cell">
                  {experience.duration}
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(experience)}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(experience)}
                      disabled={isDeletingId === experience.id}
                      className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-70"
                    >
                      {isDeletingId === experience.id ? 'Deleting...' : 'Delete'}
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

export default ExperienceTable
