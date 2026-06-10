import Sidebar from './Sidebar'

function MobileSidebar({ isOpen, onClose, onLogout }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/40"
        aria-label="Close sidebar"
        onClick={onClose}
      />
      <div className="relative h-full w-72 max-w-[85vw] shadow-xl">
        <Sidebar onLogout={onLogout} onNavigate={onClose} />
      </div>
    </div>
  )
}

export default MobileSidebar
