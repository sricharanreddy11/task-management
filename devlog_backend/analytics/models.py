from django.db import models


class OpenAIRequestLog(models.Model):
    request_id = models.CharField(max_length=255, null=True, blank=True)
    request_model = models.CharField(max_length=255, null=True, blank=True)
    request_object = models.CharField(max_length=255, null=True, blank=True)
    event_name = models.CharField(max_length=255, null=True, blank=True)
    prompt_tokens = models.IntegerField(default=0, null=True, blank=True)
    completion_tokens = models.IntegerField(default=0, null=True, blank=True)
    reference_id = models.CharField(max_length=255, default='', null=True, blank=True)
    user_id = models.CharField(max_length=255, null=True, blank=True)
    meta_data = models.JSONField(null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'openai_request_log'

