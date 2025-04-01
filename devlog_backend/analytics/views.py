import markdown
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.viewsets import GenericViewSet

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

        task_objs = Task.objects.all().filter(user=user).prefetch_related(
            "notes"
        )

        tasks_dict = UserTaskSerializer(task_objs, many=True).data

        openai_obj = OpenAIChatbotService(
            user_id=user.id,
            user_data=tasks_dict
        )

        content = openai_obj.get_response_for_prompt(user_prompt=user_prompt)

        html = markdown.markdown(content)

        return Response({
            "content": html
        }, status=status.HTTP_200_OK)



class CommandSearchAPI(APIView):

    def get(self, request):
        user = request.user
        command = request.GET.get("command", "")

        if not command:
            return Response({
                "error": "Command Not sent"
            }, status=status.HTTP_400_BAD_REQUEST)


        openai_obj = OpenAIChatbotService(
            user_id=user.id,
        )

        content_dict = openai_obj.get_response_for_command_search(command=command)

        creation_intent = content_dict.get('creation_intent', "false").lower() == "true"

        if creation_intent:
            model_obj = openai_obj.create_model_object_from_command(
                command=command,
                model_type=content_dict.get('model_type')
            )
            content_dict["created_obj_id"] = model_obj.id

        return Response(content_dict, status=status.HTTP_200_OK)

