from rest_framework import viewsets

from config.permissions import IsAdminOrReadOnly
from .models import Experience
from .serializers import ExperienceSerializer


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [IsAdminOrReadOnly]
