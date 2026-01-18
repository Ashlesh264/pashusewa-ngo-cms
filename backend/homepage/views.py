from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Banner
from .serializers import BannerSerializer

@api_view(["GET"])
def banner_list(request):
    banners = Banner.objects.filter(status=True).order_by("order")
    serializer = BannerSerializer(banners, many=True)
    return Response(serializer.data)
