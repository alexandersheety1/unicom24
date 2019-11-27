from django.contrib import admin
from gallery.models import Gallery, Comments, Jobs


# Register your models here.
@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
    )


@admin.register(Comments)
class CommentsAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
    )


@admin.register(Jobs)
class JobsAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'type'
    )
