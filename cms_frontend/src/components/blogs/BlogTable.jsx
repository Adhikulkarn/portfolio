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

function BlogTable({ blogs, onEdit, onDelete }) {
  if (!blogs.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-sm font-medium text-slate-700">No blogs found.</p>
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
                Blog
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500 md:table-cell">
                Status
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500 lg:table-cell">
                Created
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {blogs.map((blog) => (
              <tr key={blog.id} className="align-top">
                <td className="px-4 py-4">
                  <p className="font-medium text-slate-950">{blog.title}</p>
                  <p className="mt-1 line-clamp-2 max-w-2xl text-sm text-slate-600">
                    {blog.content}
                  </p>
                  <p className="mt-2 text-xs text-slate-500 md:hidden">
                    {blog.published ? 'Published' : 'Draft'} · {formatDate(blog.created_at)}
                  </p>
                </td>
                <td className="hidden px-4 py-4 md:table-cell">
                  <span
                    className={[
                      'inline-flex rounded-full px-2 py-1 text-xs font-medium',
                      blog.published
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600',
                    ].join(' ')}
                  >
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="hidden px-4 py-4 text-sm text-slate-600 lg:table-cell">
                  {formatDate(blog.created_at)}
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(blog)}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(blog)}
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

export default BlogTable
