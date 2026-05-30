from django.db import models


class Profile(models.Model):
    name            = models.CharField(max_length=100)
    title           = models.CharField(max_length=100)
    bio             = models.TextField()
    profile_img     = models.ImageField(upload_to='profile/', blank=True, null=True)
    location        = models.CharField(max_length=100)
    email           = models.EmailField()
    github_url      = models.URLField(blank=True)
    linkedin_url    = models.URLField(blank=True)
    resume          = models.FileField(upload_to='resume/', blank=True, null=True)

    def __str__(self):
        return self.name


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('backend',  'Backend'),
        ('frontend', 'Frontend'),
        ('database', 'Database'),
        ('devops',   'DevOps'),
        ('tools',    'Tools'),
        ('other',    'Other'),
    ]

    name        = models.CharField(max_length=100)
    #             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    #             NO choices here — free type ✅

    category    = models.CharField(
                    max_length=50,
                    choices=CATEGORY_CHOICES,
                    default='backend'
                  )
    #             ^^ dropdown only here ✅

    proficiency = models.IntegerField(default=80)
    icon        = models.CharField(max_length=100, blank=True)
    order       = models.IntegerField(default=0)
    #             ^^^^^^^^^^^^^^^^^^
    #             IntegerField, not CharField ✅

    def __str__(self):
        return f"{self.name} ({self.category})"


class Project(models.Model):
    title       = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack  = models.CharField(max_length=300)
    image       = models.ImageField(upload_to='projects/', blank=True, null=True)
    github_url  = models.URLField(blank=True)
    live_url    = models.URLField(blank=True)
    featured    = models.BooleanField(default=False)
    order       = models.IntegerField(default=0)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Experience(models.Model):
    company     = models.CharField(max_length=200)
    position    = models.CharField(max_length=200)
    description = models.TextField()
    location    = models.CharField(max_length=100, blank=True)
    start_date  = models.DateField()
    end_date    = models.DateField(blank=True, null=True)
    is_current  = models.BooleanField(default=False)
    order       = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.position} at {self.company}"


class Contact(models.Model):
    name      = models.CharField(max_length=100)
    email     = models.EmailField()
    subject   = models.CharField(max_length=200)
    message   = models.TextField()
    sent_at   = models.DateTimeField(auto_now_add=True)
    is_read   = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.subject}"