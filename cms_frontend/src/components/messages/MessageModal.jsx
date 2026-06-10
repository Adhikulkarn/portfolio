function formatDateTime(value) {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function MessageModal({ message, onClose }) {
  if (!message) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/40"
        aria-label="Close message details"
        onClick={onClose}
      />
      <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">{message.name}</h2>
            <a
              href={`mailto:${message.email}`}
              className="mt-1 block break-all text-sm text-slate-600 hover:text-slate-950"
            >
              {message.email}
            </a>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <dl className="mt-6 space-y-4">
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-500">Received</dt>
            <dd className="mt-1 text-sm text-slate-700">{formatDateTime(message.created_at)}</dd>
          </div>
          {message.subject ? (
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-500">Subject</dt>
              <dd className="mt-1 text-sm text-slate-700">{message.subject}</dd>
            </div>
          ) : null}
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-500">Message</dt>
            <dd className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-800">
              {message.message}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default MessageModal
