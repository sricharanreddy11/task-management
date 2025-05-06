from datetime import datetime

from django.db import models

class Memory(models.Model):
    of = models.CharField(max_length=255)
    date = models.DateField(default=datetime.now())
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'echo_memory'


class Journal(models.Model):
    of = models.CharField(max_length=255)
    date = models.DateField(default=datetime.now())
    title = models.CharField(max_length=255)
    content = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'echo_journal'

class Gallery(models.Model):
    of = models.CharField(max_length=255)
    date = models.DateField(default=datetime.now())
    title = models.CharField(max_length=255)
    image_url = models.CharField(max_length=255, null=True, blank=True)
    memory = models.ForeignKey('Memory', on_delete=models.SET_NULL, null=True, blank=True, related_name='images')

    class Meta:
        db_table = 'echo_gallery'

