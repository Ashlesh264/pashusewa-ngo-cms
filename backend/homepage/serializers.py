from rest_framework import serializers
from .models import Banner, VisionMission, Statistic, Initiative

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = [ "id", "title", "description", "image", "order", ]

class VisionMissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisionMission
        fields = ["vision", "mission", "updated_at"]

class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = ["label", "value", "order"]

class InitiativeSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Initiative
        fields = ["title", "description", "image", "order"]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return ""
