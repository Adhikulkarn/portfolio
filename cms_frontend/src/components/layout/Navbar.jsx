function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 lg:hidden"
        aria-label="Open sidebar"
      >
        <span className="space-y-1">
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </span>
      </button>

      <div>
        <p className="text-sm font-semibold text-slate-950">Admin Dashboard</p>
        <p className="hidden text-xs text-slate-500 sm:block">Manage portfolio content</p>
      </div>

      <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
        Admin
      </div>
    </header>
  )
}

export default Navbar
