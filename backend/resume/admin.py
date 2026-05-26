from django.contrib import admin

from .models import Resume


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ("title", "active", "uploaded_at")
    list_filter = ("active",)
    search_fields = ("title",)
