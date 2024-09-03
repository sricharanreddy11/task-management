from rest_framework import serializers

from analytics.models import OpenAIRequestLog
from note_management.serializers import NoteSerializer
from task_management.models import Task
from task_management.serializers import ProjectSerializer


class OpenAIModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenAIRequestLog
        fields = '__all__'
        read_only_fields = ['user']


class UserTaskSerializer(serializers.ModelSerializer):

    project = ProjectSerializer()
    notes = NoteSerializer(many=True)

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['user']
