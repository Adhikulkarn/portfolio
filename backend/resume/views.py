from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from config.permissions import IsAdminOrReadOnly
from .models import Resume
from .serializers import ResumeSerializer


class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [IsAdminOrReadOnly]

    @action(
        detail=False,
        methods=["get"],
        permission_classes=[AllowAny],
        url_path="current",
    )
    def current(self, request):
        resume = Resume.objects.filter(active=True).first()
        if not resume:
            return Response({"detail": "No active resume found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(resume)
        return Response(serializer.data)
