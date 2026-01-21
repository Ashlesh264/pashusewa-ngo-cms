from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Banner, VisionMission
from .serializers import BannerSerializer, VisionMissionSerializer

@api_view(["GET"])
def banner_list(request):
    banners = Banner.objects.filter(status=True).order_by("order")
    serializer = BannerSerializer(banners, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def vision_mission_view(request):
    vision_mission = VisionMission.objects.first()

    if not vision_mission:
        return Response({
            "vision": "",
            "mission": ""
        })

    serializer = VisionMissionSerializer(vision_mission)
    return Response(serializer.data)
