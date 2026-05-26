from django.db import models
from django.db import transaction


class Resume(models.Model):
    title = models.CharField(max_length=255)
    resume_url = models.URLField()
    active = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        with transaction.atomic():
            if self.active:
                Resume.objects.exclude(pk=self.pk).filter(active=True).update(active=False)
            super().save(*args, **kwargs)
