from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    http_method_names = ["get", "post", "delete", "head", "options"]

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return [IsAdminUser()]

    def perform_create(self, serializer):
        instance = serializer.save()

        # Build email notification template
        subject = f"Portfolio Contact: {instance.subject}"
        body = (
            f"You received a new message from your portfolio contact form:\n\n"
            f"Sender Name:  {instance.name}\n"
            f"Sender Email: {instance.email}\n"
            f"Subject:      {instance.subject}\n\n"
            f"Message:\n{instance.message}\n"
        )

        from django.conf import settings
        from django.core.mail import send_mail

        try:
            send_mail(
                subject=subject,
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL or "portfolio@aditya.com",
                recipient_list=["adityask200615@gmail.com"],
                fail_silently=True,
            )
        except Exception as e:
            print("Failed to send email notification:", str(e))

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
