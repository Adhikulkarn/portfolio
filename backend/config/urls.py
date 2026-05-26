from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("accounts.urls")),
    path("api/projects/", include("projects.urls")),
    path("api/blogs/", include("blogs.urls")),
    path("api/experience/", include("experience.urls")),
    path("api/skills/", include("skills.urls")),
    path("api/contact/", include("contact.urls")),
    path("api/resume/", include("resume.urls")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
]
