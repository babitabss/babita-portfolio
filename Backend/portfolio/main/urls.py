from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('profile',    views.ProfileViewSet)
router.register('skills',     views.SkillViewSet)
router.register('projects',   views.ProjectViewSet)
router.register('experience', views.ExperienceViewSet)
router.register('contact',    views.ContactViewSet)

urlpatterns = [
    path('', include(router.urls)),
]