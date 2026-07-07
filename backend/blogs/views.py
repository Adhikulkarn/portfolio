from rest_framework import viewsets

from config.permissions import IsAdminOrReadOnly
from .models import Blog
from .serializers import BlogSerializer


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "slug"
    lookup_url_kwarg = "slug"

    def get_queryset(self):
        queryset = Blog.objects.all()

        if self.request.user and self.request.user.is_staff:
            return queryset

        return queryset.filter(published=True)
