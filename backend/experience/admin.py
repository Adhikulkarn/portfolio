from django.contrib import admin

from .models import Experience


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "organization", "duration", "created_at")
    search_fields = ("role", "organization", "description")
