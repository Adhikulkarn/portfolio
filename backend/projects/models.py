from django.db import models
from django.utils.text import slugify


class Project(models.Model):
    STATUS_CHOICES = [
        ("ongoing", "Ongoing"),
        ("completed", "Completed"),
        ("archived", "Archived"),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField()
    tech_stack = models.CharField(max_length=500)
    github_url = models.URLField(blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    cover_image = models.URLField()
    featured = models.BooleanField(default=False)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="ongoing",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or "project"
            slug = base_slug
            suffix = 1

            while Project.objects.exclude(pk=self.pk).filter(slug=slug).exists():
                slug = f"{base_slug}-{suffix}"
                suffix += 1

            self.slug = slug

        super().save(*args, **kwargs)
