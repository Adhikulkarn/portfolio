from rest_framework import serializers

from .models import Resume


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ["id", "title", "resume_url", "active", "uploaded_at"]
        read_only_fields = ["uploaded_at"]
