from django.db import models
from django.contrib.auth import get_user_model

from task_management.models import Task


class Note(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(default="New Note", max_length=255)
    content = models.TextField(default="", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    task = models.ForeignKey(Task, on_delete=models.SET_NULL, related_name='notes', null=True, blank=True)
    tags = models.ManyToManyField('Tag', related_name='notes', null=True, blank=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'note'


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'tag'

