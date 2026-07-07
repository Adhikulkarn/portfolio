# Portfolio CMS - Project Summary

Welcome to the **Portfolio CMS** project repository. This document provides a complete high-level overview of the project structure, components, architecture, and deployment instructions.

The system is structured as a decoupled architecture:
1. **Backend**: Built with **Django** and **Django REST Framework (DRF)**. It provides a robust, token-based (JWT) REST API, admin panel integration, and database schema management.
2. **Frontend (CMS Dashboard)**: Built with **React**, **Vite**, and **TailwindCSS (v4)**. It serves as an administrative control panel for the portfolio site owner, allowing them to manage projects, blogs, work experience, skills, resume updates, and view form messages.

---

## 📁 File Structure

Below is the directory tree of the workspace, excluding temporary folders (`venv`, `node_modules`, `dist`, `__pycache__`):

```text
portfolio/
├── backend/                       # Django Backend REST API
│   ├── manage.py                  # Django CLI management script
│   ├── requirements.txt           # Python package dependencies
│   ├── Dockerfile                 # Docker setup for Render deployment
│   ├── db.sqlite3                 # Local SQLite database (development)
│   ├── config/                    # Core project configurations
│   │   ├── settings.py            # Global project settings (JWT, CORS, DB)
│   │   ├── urls.py                # Main URL router entry point
│   │   ├── permissions.py         # Custom DRF permissions (IsAdminOrReadOnly)
│   │   ├── asgi.py & wsgi.py      # WSGI/ASGI servers for production
│   ├── accounts/                  # Authentication & user profile module
│   ├── blogs/                     # Blogging module (slug auto-generation, draft controls)
│   ├── contact/                   # Contact submissions tracker (public POST / admin GET)
│   ├── experience/                # Professional history (timeline records)
│   ├── projects/                  # Developer projects showcase with image attachments
│   ├── resume/                    # Resume tracker (active-only document toggle logic)
│   └── skills/                    # Stack classification (frontend, backend, languages, etc.)
├── cms_frontend/                  # React Dashboard Panel
│   ├── index.html                 # App entry markup
│   ├── package.json               # Node script declarations & library packages
│   ├── vite.config.js             # Vite compiler & development server configuration
│   ├── vercel.json                # Vercel SPA routing properties
│   └── src/                       # Frontend source scripts
│       ├── main.jsx               # SPA bootstrap entrypoint
│       ├── App.jsx                # Main application component
│       ├── index.css              # Global styles (Tailwind CSS configuration)
│       ├── assets/                # Local visual assets & icons
│       ├── components/            # Reusable UI component modules
│       │   ├── blogs/             # Components for viewing, editing, creating blog posts
│       │   ├── common/            # Shared features (ProtectedRoute, LoadingSpinner)
│       │   ├── experience/        # Professional experience forms and lists
│       │   ├── layout/            # Layout wrappers (Sidebar, MobileSidebar, Navbar)
│       │   ├── messages/          # Contact message viewer & modal utilities
│       │   ├── projects/          # Showcase project edit/delete utilities
│       │   ├── resume/            # Resume form & action tables
│       │   └── skills/            # Tech skill management interfaces
│       ├── context/               # Global React hooks (AuthContext)
│       ├── layouts/               # Dashboard layout structure
│       ├── pages/                 # Full-screen pages mapped to routes
│       │   ├── auth/              # Login screen
│       │   ├── blogs/             # Blog index, Create, and Edit pages
│       │   ├── dashboard/         # Main statistics metrics page
│       │   ├── experience/        # Workspace experience list
│       │   ├── messages/          # User messages display
│       │   ├── projects/          # Project index, Create, and Edit pages
│       │   ├── resume/            # Resume dashboard
│       │   ├── settings/          # Admin account preferences
│       │   └── skills/            # Categories catalog
│       ├── routes/                # Application react router definitions
│       └── services/              # API networking clients (Axios, JWT middleware)
├── render.yaml                    # Infrastructure-as-code setup for Render
└── README.md                      # Basic codebase introduction
```

### Key Source Code Links
- ⚙️ **Root Settings**: [backend/config/settings.py](file:///home/spidy/Desktop/projects/portfolio/backend/config/settings.py)
- 🔀 **Root Routing**: [backend/config/urls.py](file:///home/spidy/Desktop/projects/portfolio/backend/config/urls.py)
- 🛡️ **DRF Core Security**: [backend/config/permissions.py](file:///home/spidy/Desktop/projects/portfolio/backend/config/permissions.py)
- 📦 **Infrastructure Blueprint**: [render.yaml](file:///home/spidy/Desktop/projects/portfolio/render.yaml)
- 🎛️ **Frontend Package File**: [cms_frontend/package.json](file:///home/spidy/Desktop/projects/portfolio/cms_frontend/package.json)
- 🛣️ **Client Router**: [cms_frontend/src/routes/AppRoutes.jsx](file:///home/spidy/Desktop/projects/portfolio/cms_frontend/src/routes/AppRoutes.jsx)
- 🌐 **Auth Global Context**: [cms_frontend/src/context/AuthContext.jsx](file:///home/spidy/Desktop/projects/portfolio/cms_frontend/src/context/AuthContext.jsx)

---

## ⚙️ Backend Overview

The backend exposes RESTful endpoints for managing all data models. It is configured to run with local SQLite locally and easily shift to a PostgreSQL/Neon database on cloud platforms.

### API Routing Table

| Endpoint | Supported Methods | Description | Authorization Requirement |
| :--- | :--- | :--- | :--- |
| `api/auth/login/` | `POST` | Exchange login credentials for Access/Refresh tokens | Public |
| `api/auth/refresh/` | `POST` | Refresh an expired access token | Public |
| `api/projects/` | `GET`, `POST` | List projects / create a new project | GET: Public / Write: Admin Only |
| `api/projects/{id}/` | `GET`, `PUT`, `DELETE` | Retrieve, update, or delete a project | GET: Public / Write: Admin Only |
| `api/blogs/` | `GET`, `POST` | List published posts (Public) or all posts (Staff) / create post | GET: Public / Write: Admin Only |
| `api/experience/` | `GET`, `POST`, `DELETE` | Retrieve list or edit professional history entries | GET: Public / Write: Admin Only |
| `api/skills/` | `GET`, `POST`, `DELETE` | Retrieve list or edit skill classifications | GET: Public / Write: Admin Only |
| `api/contact/` | `POST`, `GET`, `DELETE` | Create messages / read messages list / delete entries | POST: Public / Admin view and delete |
| `api/resume/` | `GET`, `POST` | List files / upload new resumes | GET: Public / Write: Admin Only |
| `api/resume/current/` | `GET` | Retrieve the active resume for public downloads | Public |
| `api/schema/` | `GET` | Retrieve OpenAPI OpenAPI Schema definition | Public |
| `api/docs/` | `GET` | View interactive Swagger UI documentation | Public |

### Model Constraints & Automations
1. **Slug Generation**: Both `Project` and `Blog` models automatically convert their human-readable title into a URL slug when saved, ensuring search engine friendly URLs.
2. **Single Active Resume**: The `Resume` model ensures that only one resume database record can have the `active=True` flag at any point. When a new resume is marked active, the model overrides the standard `.save()` logic to set all other records to inactive.
3. **Draft Filtering**: The `Blog` viewset overrides `get_queryset()` to hide drafts from public visitors, while showing them to logged-in administrator accounts.

---

## 🌐 Frontend (CMS Dashboard) Overview

The frontend React client acts as a secured Admin Control Center for editing the portfolio.

### Context & State Management
- **AuthContext**: Holds user credentials and token states (`accessToken`, `user`). Handles initialization check of valid JWTs in local storage, login form actions, and programmatic logouts when a token has expired.
- **Axios HTTP Client**: Preconfigured wrapper featuring interceptors. If a request returns a `401 Unauthorized` status (due to an expired access token), the interceptor automatically fires a call to `api/auth/refresh/` to acquire a new key and transparently retries the original request without user interruption.

### UI Shell & Styling
- **DashboardLayout**: Utilizes responsive modern layout parameters including sidebars and header navigation.
- **Tailwind CSS v4**: Powers custom gradients, micro-animations, transitions, and fully responsive glassmorphism styles across all screens.

---

## 🚀 Running the Project Locally

### Backend Setup
1. Move to backend folder: `cd backend`
2. Create python virtual env: `python3 -m venv venv`
3. Activate the environment: `source venv/bin/activate`
4. Install packages: `pip install -r requirements.txt`
5. Apply database migrations: `python manage.py migrate`
6. Run server locally: `python manage.py runserver`

### Frontend Setup
1. Move to frontend folder: `cd cms_frontend`
2. Install packages: `npm install`
3. Start development server: `npm run dev`
