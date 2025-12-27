from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('volunteer', 'Volunteer'),
        ('donor', 'Donor'),
        ('staff', 'Staff'),
    ]
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='inactive')

    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.email
