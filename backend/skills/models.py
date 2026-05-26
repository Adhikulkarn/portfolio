from django.db import models


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ("frontend", "Frontend"),
        ("backend", "Backend"),
        ("database", "Database"),
        ("devops", "DevOps"),
        ("tools", "Tools"),
        ("languages", "Languages"),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["category", "name"]
        unique_together = ("name", "category")

    def __str__(self):
        return f"{self.name} ({self.category})"
