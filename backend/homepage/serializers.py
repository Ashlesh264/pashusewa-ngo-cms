from rest_framework import serializers
from .models import Banner, VisionMission

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = [ "id", "title", "description", "image", "order", ]

class VisionMissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisionMission
        fields = ["vision", "mission", "updated_at"]
