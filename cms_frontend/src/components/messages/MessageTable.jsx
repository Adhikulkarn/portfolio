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

function MessageTable({ messages, onView, onDelete, isDeletingId }) {
  if (!messages.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-sm font-medium text-slate-700">No messages found.</p>
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
                Sender
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500 md:table-cell">
                Message
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500 lg:table-cell">
                Received
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {messages.map((message) => (
              <tr key={message.id} className="align-top">
                <td className="px-4 py-4">
                  <p className="font-medium text-slate-950">{message.name}</p>
                  <p className="mt-1 break-all text-sm text-slate-600">{message.email}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500 md:hidden">
                    {message.message}
                  </p>
                </td>
                <td className="hidden px-4 py-4 md:table-cell">
                  <p className="line-clamp-2 max-w-2xl text-sm text-slate-600">
                    {message.subject ? `${message.subject}: ` : ''}
                    {message.message}
                  </p>
                </td>
                <td className="hidden px-4 py-4 text-sm text-slate-600 lg:table-cell">
                  {formatDate(message.created_at)}
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(message)}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(message)}
                      disabled={isDeletingId === message.id}
                      className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-70"
                    >
                      {isDeletingId === message.id ? 'Deleting...' : 'Delete'}
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

export default MessageTable
