# from django.test import TestCase

# Create your tests here.
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import RegisterSerializer, UserSerializer


class RegisterView(generics.CreateAPIView):
    """
    POST /api/userauth/register/
    """
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer


class DashboardView(APIView):
    """
    GET /api/userauth/dashboard/
    Protected route – requires JWT token.
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            "message": f"Welcome, {user.full_name}!",
            "user": UserSerializer(user).data,
        }
        return Response(data)
