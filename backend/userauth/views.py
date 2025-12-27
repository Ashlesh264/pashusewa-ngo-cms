from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import UserSerializer
from .models import User
from django.http import JsonResponse
from django.views import View
from django.core.cache import cache
from .brevo_email import send_registration_otp, send_admin_added_user_email, send_login_unverified_otp, send_reset_password_otp
from .utils import generate_password, generate_otp, save_otp, verify_otp, can_resend_otp

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user = User.objects.create_user(
            full_name=request.data["full_name"],
            username=request.data["email"],  # Use email as username
            email=request.data["email"],
            password=request.data["password"],
            role=request.data.get("role")
        )
        otp = generate_otp()
        save_otp(user.email,otp)
        send_registration_otp(user.email, user.full_name, otp)  # Assuming you have this function defined
        return Response({"message": "Registration successful. Check your email to verify."}, status=201)

class AdminAddedUserView(APIView):
    permission_classes = [AllowAny] # Or IsAdminUser if only admins use this

    def post(self, request):
        password=generate_password()
        user = User.objects.create_user(
            full_name=request.data["full_name"],
            username=request.data["email"],  # Use email as username
            email=request.data["email"],
            password=password,
            role=request.data.get("role")
        )
        user.is_verified=True
        user.save()
        send_admin_added_user_email(user.email, user.full_name, password)
        return Response({"message": "User created and email sent successfully."}, status=201)

class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        if not verify_otp(email, otp):
            return Response({"error": "Invalid or expired OTP"}, status=400)

        user = User.objects.get(email=email)
        user.is_verified = True
        user.status = "active"
        user.save()

        # remove OTP after success
        cache.delete(f"otp:{email}")
        login(request, user)
        return Response({"message": "Email verified successfully"})

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(
                request,
                username=user_obj.username,  # 🔑 key line
                password=password,
                full_name=user_obj.full_name,
                status=user_obj.status
            )
        except User.DoesNotExist:
            user = None
        if user:
            if user.is_verified:
                if user.status=="inactive":
                    user.status = "active"
                    user.save()
                login(request, user)
                return Response({"message": "Login successful"})
            otp = generate_otp()
            save_otp(user.email, otp)
            send_login_unverified_otp(user.email, user.full_name, otp)
            return Response({"error": "Email not verified"}, status=403)
        return Response({"error": "Invalid email or password"}, status=401)


class DashboardView(View):
    def get(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Unauthorized"}, status=401)
        return JsonResponse({
            "full_name": request.user.full_name,
            "email": request.user.email,
            "role": request.user.role
        })

class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        new_password = request.data.get('new_password')
        try:
            user = User.objects.get(email=email)
            user.set_password(new_password) 
            user.save()
            return Response({"message": "Password updated successfully"}, status=200)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class LogoutView(APIView):
    def post(self, request):
        username = request.data.get("email")
        try:
            user = User.objects.get(username=username)
            user.status = "inactive"
            user.save()
        except:
            return Response({"message": "Try again"})
        logout(request)
        return Response({"message": "Logged out"})

class ResendOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        purpose = request.data.get("purpose")  

        if not email:
            return Response({"error": "Email required"}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        if not can_resend_otp(email):
            return Response(
                {"error": "Please wait before requesting another OTP"},status=429
            )

        otp = generate_otp()
        save_otp(email, otp)

        if purpose == "signup":
            send_registration_otp(email, user.full_name, otp)
        elif purpose == "login":
            send_login_unverified_otp(email, user.full_name, otp)
        elif purpose == "reset":
            send_reset_password_otp(email, user.full_name, otp)
        else:
            return Response({"error": "Invalid purpose"}, status=400)

        return Response({"message": "OTP resent successfully"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users_list(request):
    if request.user.role == 'admin':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    return Response({"error": "Unauthorized Access"}, status=403)
    