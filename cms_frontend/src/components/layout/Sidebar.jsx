import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Skills', to: '/skills' },
  { label: 'Experience', to: '/experience' },
  { label: 'Messages', to: '/messages' },
  { label: 'Resume', to: '/resume' },
  { label: 'Settings', to: '/settings' },
]

function Sidebar({ onLogout, onNavigate }) {
  const linkClass = ({ isActive }) =>
    [
      'block rounded-md px-3 py-2 text-sm font-medium transition',
      isActive
        ? 'bg-slate-900 text-white'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    ].join(' ')

  return (
    <aside className="flex h-full flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <p className="text-lg font-semibold text-slate-950">Portfolio CMS</p>
        <p className="mt-1 text-xs text-slate-500">Admin panel</p>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-5">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass} onClick={onNavigate}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button
          type="button"
          onClick={onLogout}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
