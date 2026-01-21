from django.urls import path
from .views import (banner_list, vision_mission_view, statistics_list, initiatives_list, 
                    create_banner, create_statistic, create_initiative, 
                    update_banner, update_vision_mission, update_statistic, update_initiative,
                    toggle_banner_status, toggle_statistic_status, toggle_initiative_status,
                    delete_banner,  delete_initiative)

urlpatterns = [
    path("banners/", banner_list, name="banner-list"),
    path("banners/create/", create_banner, name="create-banner"),
    path("banners/<int:pk>/update/", update_banner, name="update-banner"),
    path("banners/<int:pk>/toggle/", toggle_banner_status, name="toggle-banner-status"),
    path("banners/<int:pk>/delete/", delete_banner, name="delete-banner"),
    path("vision-mission/", vision_mission_view, name="vision-mission"),
    path("vision-mission/update/", update_vision_mission, name="update-vision-mission"),
    path("statistics/", statistics_list, name="statistics-list"),
    path("statistics/create/", create_statistic, name="create-statistic"),
    path("statistics/<int:pk>/update/", update_statistic, name="update-statistic"),
    path("statistics/<int:pk>/toggle/", toggle_statistic_status, name="toggle-statistic-status"),
    path("initiatives/", initiatives_list, name="initiatives-list"),
    path("initiatives/create/", create_initiative, name="create-initiative"),
    path("initiatives/<int:pk>/update/", update_initiative, name="update-initiative"),
    path("initiatives/<int:pk>/toggle/", toggle_initiative_status, name="toggle-initiative-status"),
    path("initiatives/<int:pk>/delete/", delete_initiative, name="delete-initiative"),
]
