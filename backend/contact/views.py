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
        pass

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save to database
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

        email_sent = False
        try:
            # Set fail_silently=False to surface SMTP/configuration failures
            sent_count = send_mail(
                subject=subject,
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL or "portfolio@aditya.com",
                recipient_list=["adityask200615@gmail.com"],
                fail_silently=False,
            )
            if sent_count > 0:
                email_sent = True
        except Exception as e:
            print("Failed to send email notification:", str(e))
            # Delete DB entry to prevent orphaned success entries in database
            instance.delete()
            return Response(
                {"error": "Failed to send email: " + str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        if not email_sent:
            instance.delete()
            return Response(
                {"error": "Failed to send email: SMTP server reported zero messages sent."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
