from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Banner, VisionMission, Statistic, Initiative
from .serializers import BannerSerializer, VisionMissionSerializer, StatisticSerializer, InitiativeSerializer

@api_view(["GET"])
def banner_list(request):
    banners = Banner.objects.filter(status=True).order_by("order")
    serializer = BannerSerializer(banners, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_banner(request):
    if request.user.role != "admin":
        return Response({"error": "Non-admin user"}, status=403)
    serializer = BannerSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_banner(request, pk):
    if request.user.role != "admin":
        return Response({"error": "Non-admin user"}, status=403)
    banner = Banner.objects.get(pk=pk)
    serializer = BannerSerializer(banner, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def toggle_banner_status(request, pk):
    if request.user.role != "admin":
        return Response({"error": "Non-admin user"}, status=403)
    banner = Banner.objects.get(pk=pk)
    banner.status = not banner.status
    banner.save()
    return Response({"status": banner.status})

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_banner(request, pk):
    if request.user.role != "admin":
        return Response({"error": "Non-admin user"}, status=403)
    Banner.objects.get(pk=pk).delete()
    return Response({"message": "Banner deleted"})

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

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_vision_mission(request):
    if request.user.role != "admin":
        return Response({"error": "Non-admin user"}, status=403)
    obj = VisionMission.objects.order_by("-updated_at").first()
    serializer = VisionMissionSerializer(obj, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)

@api_view(["GET"])
def statistics_list(request):
    stats = Statistic.objects.filter(status=True).order_by("order")
    serializer = StatisticSerializer(stats, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_statistic(request):
    if request.user.role != "admin":
        return Response({"error": "Non-admin user"}, status=403)
    serializer = StatisticSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_statistic(request, pk):
    if request.user.role != "admin":
        return Response({"error": "Non-admin user"}, status=403)
    stat = Statistic.objects.get(pk=pk)
    serializer = StatisticSerializer(stat, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def toggle_statistic_status(request, pk):
    if request.user.role != "admin":
        return Response({"error": "Non-admin user"}, status=403)
    stat = Statistic.objects.get(pk=pk)
    stat.status = not stat.status
    stat.save()
    return Response({"status": stat.status})

@api_view(["GET"])
def initiatives_list(request):
    initiatives = Initiative.objects.filter(status=True).order_by("order")
    serializer = InitiativeSerializer(
        initiatives, many=True, context={"request": request}
    )
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_initiative(request):
    if request.user.role != "admin":
        return Response({"error": "Non-admin user"}, status=403)
    serializer = InitiativeSerializer(data=request.data, context={"request": request})
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_initiative(request, pk):
    if request.user.role != "admin":
        return Response({"error": "Non-admin user"}, status=403)
    obj = Initiative.objects.get(pk=pk)
    serializer = InitiativeSerializer(
        obj, data=request.data, context={"request": request}
    )
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def toggle_initiative_status(request, pk):
    if request.user.role != "admin":
        return Response({"error": "Non-admin user"}, status=403)
    obj = Initiative.objects.get(pk=pk)
    obj.status = not obj.status
    obj.save()
    return Response({"status": obj.status})

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_initiative(request, pk):
    if request.user.role != "admin":
        return Response({"error": "Non-admin user"}, status=403)
    Initiative.objects.get(pk=pk).delete()
    return Response({"message": "Initiative deleted"})
