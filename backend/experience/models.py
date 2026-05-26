from django.db import models


class Experience(models.Model):
    role = models.CharField(max_length=255)
    organization = models.CharField(max_length=255)
    duration = models.CharField(max_length=100)
    description = models.TextField()
    logo_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.role} at {self.organization}"
