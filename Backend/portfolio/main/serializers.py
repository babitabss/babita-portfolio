from rest_framework import serializers
from .models import Profile, Project, Contact, Experience, Skill

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        
class ProjectSerializer(serializers.ModelSerializer):
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
        exclude = ['is_read', 'sent_at']     