from datetime import timedelta

from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Task, Project
from .serializers import TaskSerializer, ProjectSerializer


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    filterset_fields = ['status', 'priority', 'due_date']
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(methods=['GET'], detail=False, url_path='counts', url_name='counts')
    def task_counts(self, request):
        user_tasks = self.get_queryset()

        all_tasks_count = user_tasks.count()
        completed_tasks_count = user_tasks.filter(status='completed').count()
        high_priority_open_count = user_tasks.filter(priority='high', status='open').count()
        todo_tasks_count = user_tasks.filter(status='todo').count()

        return Response({
            'all_tasks': all_tasks_count,
            'completed_tasks': completed_tasks_count,
            'high_priority_open_tasks': high_priority_open_count,
            'todo_tasks': todo_tasks_count
        }, status=status.HTTP_200_OK)

    @action(methods=['GET'], detail=False, url_path='graph-data', url_name='graph_data')
    def graph_data(self, request):
        user_tasks = self.get_queryset()

        # Dates range for past 7 days
        today = timezone.now().date()
        past_week = [today - timedelta(days=i) for i in range(7)]

        # Task completions for past week
        completions_per_day = {
            (today - timedelta(days=i)).isoformat(): user_tasks.filter(
                status='completed',
                updated_at__date=today - timedelta(days=i)
            ).count()
            for i in range(7)
        }

        # Tasks added each day for the past week
        tasks_added_per_day = {
            (today - timedelta(days=i)).isoformat(): user_tasks.filter(
                created_at__date=today - timedelta(days=i)
            ).count()
            for i in range(7)
        }

        # Tasks due in the next 7 days
        tasks_due_next_7_days = {
            (today + timedelta(days=i)).isoformat(): user_tasks.filter(
                due_date__date=today + timedelta(days=i)
            ).count()
            for i in range(7)
        }

        return Response({
            'completions_per_day': completions_per_day,
            'tasks_added_per_day': tasks_added_per_day,
            'tasks_due_next_7_days': tasks_due_next_7_days
        }, status=status.HTTP_200_OK)

    @action(methods=['GET'], detail=False, url_path='alerts', url_name='alerts')
    def alerts_for_tasks(self, request):
        user_tasks = self.get_queryset()
        now = timezone.now()
        due_soon_tasks = user_tasks.filter(due_date__range=(now, now + timedelta(days=2)))
        task_list = [{'id': task.id, 'title': task.title, 'due_date': task.due_date} for task in due_soon_tasks]
        return Response({'tasks': task_list})


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    filterset_fields = ['start_date', 'end_date']
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


