import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/common/ProtectedRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import Login from '../pages/auth/Login'
import Blogs from '../pages/blogs/Blogs'
import CreateBlog from '../pages/blogs/CreateBlog'
import EditBlog from '../pages/blogs/EditBlog'
import Dashboard from '../pages/dashboard/Dashboard'
import Experience from '../pages/experience/Experience'
import Messages from '../pages/messages/Messages'
import CreateProject from '../pages/projects/CreateProject'
import EditProject from '../pages/projects/EditProject'
import Projects from '../pages/projects/Projects'
import Resume from '../pages/resume/Resume'
import Settings from '../pages/settings/Settings'
import Skills from '../pages/skills/Skills'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/new" element={<CreateProject />} />
            <Route path="/projects/edit/:id" element={<EditProject />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/new" element={<CreateBlog />} />
            <Route path="/blogs/edit/:id" element={<EditBlog />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
