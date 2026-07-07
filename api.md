# Portfolio CMS API Documentation

This document lists all the available backend API endpoints, their HTTP methods, access permissions, payload requirements, and response structures.

## Table of Contents
- [Authentication & Permissions](#authentication--permissions)
- [Health Check](#health-check)
- [Authentication Endpoints](#authentication-endpoints)
- [Projects API](#projects-api)
- [Blogs API](#blogs-api)
- [Experience API](#experience-api)
- [Skills API](#skills-api)
- [Contact Messages API](#contact-messages-api)
- [Resume API](#resume-api)
- [API Documentation & Schema](#api-documentation--schema)

---

## Authentication & Permissions

The API uses **JSON Web Tokens (JWT)** for authentication.
- **Header format**: `Authorization: Bearer <access_token>`
- **Access Token Lifetime**: 30 minutes
- **Refresh Token Lifetime**: 7 days

### Permission Levels:
1. **AllowAny**: Public endpoints accessible without authentication.
2. **IsAdminOrReadOnly**: Read-only methods (`GET`, `HEAD`, `OPTIONS`) are open to the public; write methods (`POST`, `PUT`, `PATCH`, `DELETE`) require admin credentials (`is_staff = True`).
3. **IsAdminUser**: All methods require admin credentials.

---

## Health Check

### Get Health Status
Used to check if the API backend and database are functional.
- **Endpoint**: `/api/health/`
- **Method**: `GET`, `HEAD`
- **Permissions**: `AllowAny`
- **Response**:
  - `200 OK` (Body: `OK`)
  - `503 Service Unavailable` if database is down (Body: `Database Unavailable`)

---

## Authentication Endpoints

### User Login
Authenticate credentials to obtain access and refresh tokens.
- **Endpoint**: `/api/auth/login/`
- **Method**: `POST`
- **Permissions**: `AllowAny`
- **Request Body**:
  ```json
  {
    "username": "admin_username",
    "password": "your_secure_password"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "refresh": "<refresh_token_string>",
    "access": "<access_token_string>"
  }
  ```

### Refresh Token
Obtain a new access token using a valid refresh token.
- **Endpoint**: `/api/auth/refresh/`
- **Method**: `POST`
- **Permissions**: `AllowAny`
- **Request Body**:
  ```json
  {
    "refresh": "<refresh_token_string>"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "access": "<new_access_token_string>"
  }
  ```

---

## Projects API

Manage projects displayed in the portfolio.
- **Configuration**: See [projects/urls.py](file:///home/spidy/Desktop/projects/portfolio/backend/projects/urls.py), [projects/views.py](file:///home/spidy/Desktop/projects/portfolio/backend/projects/views.py), [projects/models.py](file:///home/spidy/Desktop/projects/portfolio/backend/projects/models.py)
- **Permissions**: `IsAdminOrReadOnly` (Public Read / Admin Write)

### Project Model Fields:
- `id` (Integer, Read-Only)
- `title` (String, max 255 chars, Required)
- `slug` (String, unique, Read-Only, auto-generated from title)
- `description` (String/Text, Required)
- `tech_stack` (String, max 500 chars, Required)
- `github_url` (URL, Optional)
- `live_url` (URL, Optional)
- `cover_image` (URL, Required)
- `featured` (Boolean, default `false`)
- `status` (String, choice of `ongoing`, `completed`, `archived`, default `ongoing`)
- `created_at` (DateTime, Read-Only)
- `updated_at` (DateTime, Read-Only)

### Endpoints:
- **`GET` `/api/projects/`**: List all projects.
- **`POST` `/api/projects/`**: Create a new project (Admin only).
- **`GET` `/api/projects/<id>/`**: Retrieve details of a specific project.
- **`PUT` `/api/projects/<id>/`**: Full update of a project (Admin only).
- **`PATCH` `/api/projects/<id>/`**: Partial update of a project (Admin only).
- **`DELETE` `/api/projects/<id>/`**: Delete a project (Admin only).

---

## Blogs API

Manage blog posts.
- **Configuration**: See [blogs/urls.py](file:///home/spidy/Desktop/projects/portfolio/backend/blogs/urls.py), [blogs/views.py](file:///home/spidy/Desktop/projects/portfolio/backend/blogs/views.py), [blogs/models.py](file:///home/spidy/Desktop/projects/portfolio/backend/blogs/models.py)
- **Permissions**: `IsAdminOrReadOnly` (Public Read / Admin Write)
- **Behavior**: Non-admin users only see published blogs (`published=true`). Admins can see and retrieve drafts (`published=false`).

### Blog Model Fields:
- `id` (Integer, Read-Only)
- `title` (String, max 255 chars, Required)
- `slug` (String, unique, Read-Only, auto-generated from title)
- `content` (String/Text, Required)
- `cover_image` (URL, Required)
- `tags` (String, comma-separated tags, Optional)
- `published` (Boolean, default `false`)
- `created_at` (DateTime, Read-Only)
- `updated_at` (DateTime, Read-Only)

### Endpoints:
- **`GET` `/api/blogs/`**: List blogs (non-admins get only published posts).
- **`POST` `/api/blogs/`**: Create a new blog post (Admin only).
- **`GET` `/api/blogs/<id>/`**: Retrieve a specific blog post (drafts only available to Admins).
- **`PUT` `/api/blogs/<id>/`**: Full update of a blog post (Admin only).
- **`PATCH` `/api/blogs/<id>/`**: Partial update of a blog post (Admin only).
- **`DELETE` `/api/blogs/<id>/`**: Delete a blog post (Admin only).

---

## Experience API

Manage work/educational experiences.
- **Configuration**: See [experience/urls.py](file:///home/spidy/Desktop/projects/portfolio/backend/experience/urls.py), [experience/views.py](file:///home/spidy/Desktop/projects/portfolio/backend/experience/views.py), [experience/models.py](file:///home/spidy/Desktop/projects/portfolio/backend/experience/models.py)
- **Permissions**: `IsAdminOrReadOnly` (Public Read / Admin Write)

### Experience Model Fields:
- `id` (Integer, Read-Only)
- `role` (String, max 255 chars, Required)
- `organization` (String, max 255 chars, Required)
- `duration` (String, max 100 chars, e.g. "Jan 2020 - Present", Required)
- `description` (String/Text, Required)
- `logo_url` (URL, Optional)
- `created_at` (DateTime, Read-Only)

### Endpoints:
- **`GET` `/api/experience/`**: List all experience entries.
- **`POST` `/api/experience/`**: Create a new experience (Admin only).
- **`GET` `/api/experience/<id>/`**: Retrieve a specific experience.
- **`PUT` `/api/experience/<id>/`**: Full update of an experience (Admin only).
- **`PATCH` `/api/experience/<id>/`**: Partial update of an experience (Admin only).
- **`DELETE` `/api/experience/<id>/`**: Delete an experience (Admin only).

---

## Skills API

Manage technical and professional skills.
- **Configuration**: See [skills/urls.py](file:///home/spidy/Desktop/projects/portfolio/backend/skills/urls.py), [skills/views.py](file:///home/spidy/Desktop/projects/portfolio/backend/skills/views.py), [skills/models.py](file:///home/spidy/Desktop/projects/portfolio/backend/skills/models.py)
- **Permissions**: `IsAdminOrReadOnly` (Public Read / Admin Write)

### Skill Model Fields:
- `id` (Integer, Read-Only)
- `name` (String, max 100 chars, Required)
- `category` (String, Choice of: `frontend`, `backend`, `database`, `devops`, `tools`, `languages`, `soft_skills`, Required)
- `created_at` (DateTime, Read-Only)

### Endpoints:
- **`GET` `/api/skills/`**: List all skills.
- **`POST` `/api/skills/`**: Create a new skill (Admin only).
- **`GET` `/api/skills/<id>/`**: Retrieve a specific skill.
- **`PUT` `/api/skills/<id>/`**: Full update of a skill (Admin only).
- **`PATCH` `/api/skills/<id>/`**: Partial update of a skill (Admin only).
- **`DELETE` `/api/skills/<id>/`**: Delete a skill (Admin only).

---

## Contact Messages API

Allows guests to send contact form submissions, and admins to review them.
- **Configuration**: See [contact/urls.py](file:///home/spidy/Desktop/projects/portfolio/backend/contact/urls.py), [contact/views.py](file:///home/spidy/Desktop/projects/portfolio/backend/contact/views.py), [contact/models.py](file:///home/spidy/Desktop/projects/portfolio/backend/contact/models.py)
- **Permissions**:
  - `POST` / Create: `AllowAny` (Public guest message submission)
  - Other operations (`GET`, `DELETE`): `IsAdminUser` (Admin only)
- **Supported HTTP Methods**: `GET`, `POST`, `DELETE`, `HEAD`, `OPTIONS` *(Note: Updates via `PUT` or `PATCH` are disabled)*

### ContactMessage Model Fields:
- `id` (Integer, Read-Only)
- `name` (String, max 255 chars, Required)
- `email` (Email address, Required)
- `subject` (String, max 255 chars, Required)
- `message` (String/Text, Required)
- `created_at` (DateTime, Read-Only)

### Endpoints:
- **`GET` `/api/contact/`**: List all contact messages (Admin only).
- **`POST` `/api/contact/`**: Submit a new contact message (Public access).
- **`GET` `/api/contact/<id>/`**: Retrieve detail of a contact message (Admin only).
- **`DELETE` `/api/contact/<id>/`**: Delete a contact message (Admin only).

---

## Resume API

Manage resumes links and designate the active resume.
- **Configuration**: See [resume/urls.py](file:///home/spidy/Desktop/projects/portfolio/backend/resume/urls.py), [resume/views.py](file:///home/spidy/Desktop/projects/portfolio/backend/resume/views.py), [resume/models.py](file:///home/spidy/Desktop/projects/portfolio/backend/resume/models.py)
- **Permissions**: `IsAdminOrReadOnly` (Public Read / Admin Write) except for `current/` action which is `AllowAny`.
- **Special behavior**: Saving a resume with `active=True` automatically sets all other resumes to `active=False`.

### Resume Model Fields:
- `id` (Integer, Read-Only)
- `title` (String, max 255 chars, Required)
- `resume_url` (URL, Required)
- `active` (Boolean, default `false`)
- `uploaded_at` (DateTime, Read-Only)

### Endpoints:
- **`GET` `/api/resume/`**: List all resumes.
- **`POST` `/api/resume/`**: Create/upload a new resume entry (Admin only).
- **`GET` `/api/resume/<id>/`**: Retrieve a specific resume entry.
- **`PUT` `/api/resume/<id>/`**: Full update of a resume entry (Admin only).
- **`PATCH` `/api/resume/<id>/`**: Partial update of a resume entry (Admin only).
- **`DELETE` `/api/resume/<id>/`**: Delete a resume entry (Admin only).
- **`GET` `/api/resume/current/`**: Retrieve the currently active resume. Returns `404 Not Found` if there is no active resume. Permissions: `AllowAny`.

---

## API Documentation & Schema

Generates the OpenAPI 3 schema and serves interactive Swagger documentation.
- **Permissions**: `AllowAny`

### Endpoints:
- **`GET` `/api/schema/`**: Retrieve the OpenAPI 3 schema specification in YAML format.
- **`GET` `/api/docs/`**: Access the interactive Swagger UI.
