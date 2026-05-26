from django.db import models
from django.utils.text import slugify


class Blog(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    content = models.TextField()
    cover_image = models.URLField()
    tags = models.CharField(max_length=255, blank=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or "blog"
            slug = base_slug
            suffix = 1

            while Blog.objects.exclude(pk=self.pk).filter(slug=slug).exists():
                slug = f"{base_slug}-{suffix}"
                suffix += 1

            self.slug = slug

        super().save(*args, **kwargs)
