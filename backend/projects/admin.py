from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "featured", "created_at", "updated_at")
    list_filter = ("status", "featured", "created_at")
    search_fields = ("title", "tech_stack", "description")
    prepopulated_fields = {"slug": ("title",)}
