from django.contrib import admin

from .models import Blog


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("title", "published", "created_at", "updated_at")
    list_filter = ("published", "created_at")
    search_fields = ("title", "tags", "content")
    prepopulated_fields = {"slug": ("title",)}
