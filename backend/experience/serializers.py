from rest_framework import serializers

from .models import Experience


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "id",
            "role",
            "organization",
            "duration",
            "description",
            "logo_url",
            "created_at",
        ]
        read_only_fields = ["created_at"]
