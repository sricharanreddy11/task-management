from rest_framework import viewsets

from .models import Memory, Journal, Gallery
from .serializers import MemorySerializer, JournalSerializer, GallerySerializer


class MemoryAPI(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    queryset = Memory.objects.all().prefetch_related('images')
    serializer_class = MemorySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        of = self.request.query_params.get('of', None)
        if of is not None:
            queryset = queryset.filter(of=of)
        return queryset


class JournalAPI(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    queryset = Journal.objects.all()
    serializer_class = JournalSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        of = self.request.query_params.get('of', None)
        if of is not None:
            queryset = queryset.filter(of=of)
        return queryset


class GalleryAPI(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        of = self.request.query_params.get('of', None)
        if of is not None:
            queryset = queryset.filter(of=of)
        return queryset