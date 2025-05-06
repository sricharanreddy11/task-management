from rest_framework import serializers
from .models import Memory, Journal, Gallery


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'


class MemorySerializer(serializers.ModelSerializer):
    images = GallerySerializer(read_only=True, many=True)

    class Meta:
        model = Memory
        fields = '__all__'


class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = '__all__'