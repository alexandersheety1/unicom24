from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, BasePermission
from gallery.models import Gallery, Comments, Jobs
from gallery.serializers import GallerySerializer, CommentsSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseBadRequest
from gallery.tasks import send_email


class EditPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'PUT' or request.method == 'DELETE' or request.method == 'PATCH':
            if request.user == obj.user:
                return True
            else:
                return False
        else:
            return True


class GalleryViewSet(ModelViewSet):
    serializer_class = GallerySerializer
    permission_classes = [IsAuthenticated, EditPermission]
    queryset = Gallery.objects.all()

    filterset_fields = (
        'id',
        'user'
    )

    def list(self, request, *args, **kwargs):
        response = super().list(request, args, kwargs)
        if len(response.data) == 0:
            response.data = {
                'results': [],
                'user_id': request.user.id,
                'username': request.user.username
            }
        else:
            response.data = {
                'results': response.data,
                'user_id': request.user.id,
                'username': request.user.username
            }
        return response

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, args, kwargs)
        if response.data:
            response.data['user_id'] = request.user.id
            response.data['username'] = request.user.username
        return response


class CommentsViewSet(ModelViewSet):
    serializer_class = CommentsSerializer
    permission_classes = [IsAuthenticated, EditPermission]
    queryset = Comments.objects.all()
    filterset_fields = (
        'id',
        'user'
    )


class JobsViewSet(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ['post']

    def post(self, request, format=None):
        currentjob, created = Jobs.objects.get_or_create(user=request.user)
        if currentjob.type != 2:
            type = request.data.get("type")
            if type:
                if type == 2:
                    gallery = Gallery.objects.filter(user=request.user)
                else:
                    gallery = Gallery.objects.all()
                if gallery.exists():
                    currentjob.type = 1
                    currentjob.save()
                    send_email.delay(currentjob, gallery)
                else:
                    return Response({"job_type": 3}, status=status.HTTP_200_OK)
            else:
                return HttpResponseBadRequest
            return Response({"job_type": 1}, status=status.HTTP_200_OK)
        else:
            return Response({"job_type": 2}, status=status.HTTP_200_OK)
