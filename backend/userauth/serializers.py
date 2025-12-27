from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("id", "full_name", "username", "email", "password", "role")

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
            full_name=validated_data["full_name"],
            role=validated_data.get("role", "admin"),
        )
        validate_password(password, user)
        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "full_name", "username", "email", "role", "status", "is_verified")