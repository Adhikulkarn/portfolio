import { useEffect, useMemo, useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import MessageModal from '../../components/messages/MessageModal'
import MessageTable from '../../components/messages/MessageTable'
import { messageService } from '../../services/messageService'

function Messages() {
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isDeletingId, setIsDeletingId] = useState(null)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const filteredMessages = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return messages
    }

    return messages.filter(
      (message) =>
        message.name.toLowerCase().includes(query) ||
        message.email.toLowerCase().includes(query),
    )
  }, [messages, searchTerm])

  useEffect(() => {
    let isMounted = true

    const loadMessages = async () => {
      setIsLoading(true)
      setError('')

      try {
        const data = await messageService.getMessages()
        if (isMounted) {
          setMessages(data)
        }
      } catch {
        if (isMounted) {
          setError('Unable to load messages.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadMessages()

    return () => {
      isMounted = false
    }
  }, [])

  const handleDelete = async (message) => {
    setIsDeletingId(message.id)
    setError('')
    setSuccessMessage('')

    try {
      await messageService.deleteMessage(message.id)
      setMessages((current) => current.filter((item) => item.id !== message.id))
      if (selectedMessage?.id === message.id) {
        setSelectedMessage(null)
      }
      setSuccessMessage('Message deleted successfully.')
    } catch {
      setError('Unable to delete message.')
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Messages</h1>
        <p className="mt-1 text-sm text-slate-600">Review contact form submissions.</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <label htmlFor="message-search" className="block text-sm font-medium text-slate-700">
          Search messages
        </label>
        <input
          id="message-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by name or email"
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
          <LoadingSpinner label="Loading messages" />
        </div>
      ) : (
        <MessageTable
          messages={filteredMessages}
          onView={setSelectedMessage}
          onDelete={handleDelete}
          isDeletingId={isDeletingId}
        />
      )}

      <MessageModal message={selectedMessage} onClose={() => setSelectedMessage(null)} />
    </section>
  )
}

export default Messages
