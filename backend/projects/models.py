from django.db import models
from django.utils.text import slugify

class Project(models.Model):
    STATUS_CHOICES = [
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('archived', 'Archived'),
    ]

    title = models.CharField(max_length=255)

    slug = models.SlugField(
        unique=True,
        blank=True,
        null=True
    )

    description = models.TextField()

    tech_stack = models.CharField(max_length=500)

    github_url = models.URLField(
        blank=True,
        null=True
    )

    live_url = models.URLField(
        blank=True,
        null=True
    )

    cover_image = models.URLField()

    featured = models.BooleanField(default=False)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='ongoing'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)