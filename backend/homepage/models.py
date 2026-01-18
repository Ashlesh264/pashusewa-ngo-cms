from django.db import models

class Banner(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="banners/")
    order = models.PositiveIntegerField(default=0)
    status = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title
