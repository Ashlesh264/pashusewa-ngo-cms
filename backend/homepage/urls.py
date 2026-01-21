from django.urls import path
from .views import banner_list, vision_mission_view, statistics_list, initiatives_list

urlpatterns = [
    path("banners/", banner_list, name="banner-list"),
    path("vision-mission/", vision_mission_view, name="vision-mission"),
    path("statistics/", statistics_list, name="statistics-list"),
    path("initiatives/", initiatives_list, name="initiatives-list"),
]
