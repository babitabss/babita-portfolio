from django.contrib import admin

# Register your models here.
from .models import Profile, Skill, Project, Experience, Contact

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email', 'location']
    
@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display =['name', 'category', 'proficiency', 'order']
    list_filter   = ['category'] 
    ordering      = ['order']  
    
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ['title', 'featured', 'order', 'created_at']
    list_filter   = ['featured']
    ordering      = ['order']


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display  = ['position', 'company', 'start_date', 'end_date', 'is_current']
    ordering      = ['order']


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display  = ['name', 'email', 'subject', 'sent_at', 'is_read']
    list_filter   = ['is_read']
    readonly_fields = ['name', 'email', 'subject', 'sent_at']    