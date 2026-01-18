from django.urls import path
from .views import banner_list

urlpatterns = [
    path("banners/", banner_list, name="banner-list"),
]
