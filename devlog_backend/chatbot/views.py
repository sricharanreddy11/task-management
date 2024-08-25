from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView

from chatbot.langchain import LangChainService
from rest_framework import status


class ChatbotAPI(APIView):
    def get(self, request):
        user = request.user
        user_prompt = request.GET.get("user_prompt", "")

        if not user_prompt:
            return Response({
                "error": "User Prompt Not sent"
            }, status=status.HTTP_400_BAD_REQUEST)

        langchain_obj = LangChainService()

        langchain_obj.initialize_db()
        content = langchain_obj.get_response_for_prompt(user_prompt=user_prompt)

        return Response({
            "content": content
        }, status=status.HTTP_200_OK)




