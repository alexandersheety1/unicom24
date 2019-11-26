from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, BasePermission
from gallery.models import Gallery, Comments
from gallery.serializers import GallerySerializer, CommentsSerializer, UserSerializer
from django.contrib.auth.models import User

class EditPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'PUT' or request.method == 'DELETE':
            if request.user == obj.user:
                return True
            else:
                return False
        else:
            return True


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.all().filter(
            id=self.request.user.id
        )


class GalleryViewSet(viewsets.ModelViewSet):
    serializer_class = GallerySerializer
    permission_classes = [IsAuthenticated, EditPermission]
    filterset_fields = '__all__'
    queryset = Gallery.objects.all()

class CommentsViewSet(viewsets.ModelViewSet):
    serializer_class = CommentsSerializer
    permission_classes = [IsAuthenticated, EditPermission]
    filterset_fields = '__all__'

    def get_queryset(self):
        return Comments.objects.filter(user=self.request.user)
