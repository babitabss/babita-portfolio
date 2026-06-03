from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .models import Profile, Project, Experience, Skill, Contact
from .serializers import (
    ProfileSerializer,
    ProjectSerializer,
    ExperienceSerializer,
    SkillSerializer,
    ContactSerializer,
)
import threading


def send_email_async(subject, message, from_email, recipient_list):
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=from_email,
            recipient_list=recipient_list,
            fail_silently=True,
        )
    except Exception:
        pass


class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by('order', '-created_at')
    serializer_class = ProjectSerializer


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all().order_by('order', '-start_date')
    serializer_class = ExperienceSerializer


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all().order_by('order', 'name')
    serializer_class = SkillSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact = serializer.save()

        # Send email in background thread — never blocks or crashes the response
        if settings.EMAIL_HOST_USER and settings.NOTIFY_EMAIL:
            thread = threading.Thread(
                target=send_email_async,
                args=(
                    f"[Portfolio] New message: {contact.subject}",
                    f"From: {contact.name} <{contact.email}>\n\n{contact.message}",
                    settings.EMAIL_HOST_USER,
                    [settings.NOTIFY_EMAIL],
                ),
                daemon=True,
            )
            thread.start()

        return Response(
            {"detail": "Message sent successfully!"},
            status=status.HTTP_201_CREATED,
        )