from rest_framework import routers
from gallery.views import GalleryViewSet,CommentsViewSet
router = routers.DefaultRouter()

router.register(
    r'gallery',
    GalleryViewSet,
    basename='gallery'
)

router.register(
    r'comments',
    CommentsViewSet,
    basename='comments'
)