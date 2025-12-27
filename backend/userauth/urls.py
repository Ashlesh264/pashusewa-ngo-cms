from django.urls import path
from . import views
from .views import LoginView, DashboardView, LogoutView, RegisterView, VerifyEmailView, ResetPasswordView, ResendOTPView, AdminAddedUserView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("admin-added-user/", AdminAddedUserView.as_view()),
    path("verify-email/", VerifyEmailView.as_view()),
    path("login/", LoginView.as_view()),
    path("dashboard/", DashboardView.as_view()),
    path("reset-password/", ResetPasswordView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("resend-otp/", ResendOTPView.as_view()),
    path("users-list/", views.get_users_list, name="users-list"),
]
