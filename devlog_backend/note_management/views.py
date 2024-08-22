from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Note, Tag
from .serializers import NoteSerializer, TagSerializer


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    filterset_fields = ['created_at', 'updated_at', 'tags__name']
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]
