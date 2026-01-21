from django.contrib import admin
from .models import Banner

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "status")
    list_editable = ("order", "status")
    list_filter = ("status",)
    search_fields = ("title",)

from django.contrib import admin
from .models import VisionMission

@admin.register(VisionMission)
class VisionMissionAdmin(admin.ModelAdmin):
    list_display = ("updated_at",)

from .models import Statistic

@admin.register(Statistic)
class StatisticAdmin(admin.ModelAdmin):
    list_display = ("label", "value", "order", "status")
    list_editable = ("value", "order", "status")
