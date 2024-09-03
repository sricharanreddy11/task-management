import markdown
from bs4 import BeautifulSoup
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from analytics.serializers import UserTaskSerializer
from analytics.services.openai_service import OpenAIChatbotService
from task_management.models import Task


class ChatbotAPI(APIView):
    def get(self, request):
        user = request.user
        user_prompt = request.GET.get("user_prompt", "")

        if not user_prompt:
            return Response({
                "error": "User Prompt Not sent"
            }, status=status.HTTP_400_BAD_REQUEST)

        task_objs = Task.objects.all().prefetch_related(
            "notes"
        )

        tasks_dict = UserTaskSerializer(task_objs, many=True).data

        openai_obj = OpenAIChatbotService(
            user_id=user.id,
            user_data=tasks_dict
        )

        content = openai_obj.get_response_for_prompt(user_prompt=user_prompt)

        html = markdown.markdown(content)
        soup = BeautifulSoup(html, features='html.parser')

        return Response({
            "content": soup.get_text()
        }, status=status.HTTP_200_OK)




