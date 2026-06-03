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

        try:
            if settings.EMAIL_HOST_USER and settings.NOTIFY_EMAIL:
                send_mail(
                    subject=f"[Portfolio] New message: {contact.subject}",
                    message=(
                        f"From: {contact.name} <{contact.email}>\n\n"
                        f"{contact.message}"
                    ),
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[settings.NOTIFY_EMAIL],
                    fail_silently=True,
                )
        except Exception:
            pass

        return Response(
            {"detail": "Message sent successfully!"},
            status=status.HTTP_201_CREATED,
        )