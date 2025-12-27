# from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sessions.models import Session
from django.utils import timezone

def logout_user_from_all_devices(user):
    sessions = Session.objects.filter(expire_date__gte=timezone.now())

    for session in sessions:
        data = session.get_decoded()
        if data.get('_auth_user_id') == str(user.id):
            session.delete()

import random
from django.core.cache import cache

OTP_EXPIRY = 10 * 60  # 10 minutes
RESEND_OTP = 60 # 1 minutes

def generate_otp():
    return str(random.randint(100000, 999999))

def save_otp(email, otp):
    cache.set(f"otp:{email}", otp, timeout=OTP_EXPIRY)

def verify_otp(email, otp):
    save_otp = cache.get(f"otp:{email}")
    if save_otp and save_otp == otp:
        cache.delete(f"otp:{email}")
        return True
    return False

def can_resend_otp(email):
    if cache.get(f"otp_resend:{email}"):
        return False
    cache.set(f"otp_resend:{email}", True, RESEND_OTP)
    return True

def generate_password():
    return "PashuSewa@"+str(random.randint(100, 999))