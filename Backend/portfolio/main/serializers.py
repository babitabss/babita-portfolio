from rest_framework import serializers
from cloudinary.utils import cloudinary_url
from .models import Profile, Project, Contact, Experience, Skill


def get_cloudinary_url(value):
    """Convert a CloudinaryField value to a full https:// URL."""
    if not value:
        return None
    url = str(value)
    if url.startswith("http"):
        return url
    # Build the full Cloudinary URL
    result, _ = cloudinary_url(url, secure=True)
    return result


class ProfileSerializer(serializers.ModelSerializer):
    profile_img = serializers.SerializerMethodField()
    resume      = serializers.SerializerMethodField()

    def get_profile_img(self, obj):
        return get_cloudinary_url(obj.profile_img)

    def get_resume(self, obj):
        return get_cloudinary_url(obj.resume)

    class Meta:
        model = Profile
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        return get_cloudinary_url(obj.image)

    class Meta:
        model = Project
        fields = '__all__'


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'subject', 'message']