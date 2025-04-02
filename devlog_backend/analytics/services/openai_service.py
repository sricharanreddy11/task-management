import json

from django.utils.datetime_safe import datetime
from openai import OpenAI
from pydantic import BaseModel
from rest_framework import serializers

from analytics.serializers import OpenAIModelSerializer, UserTaskSerializer
from analytics.unit_functions import MODEL_REGISTRY, PYDANTIC_MODEL_REGISTRY, create_object
from devlog.settings import env
from task_management.models import Task


class OpenAIService:
    def __init__(self):
        self.model = "gpt-4o-mini"
        self.client = OpenAI(api_key=env('OPENAI_API_KEY'))

    def generate_response(self, messages, n, max_tokens, temperature, frequency_penalty):
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature,
            n=n,
            frequency_penalty=frequency_penalty,
        )
        return response

    def generate_structured_response(self, messages, n, response_format, temperature, frequency_penalty):
        completion = self.client.beta.chat.completions.parse(
            model=self.model,
            messages=messages,
            response_format=response_format,
            frequency_penalty=frequency_penalty,
            n=n,
            temperature=temperature
        )

        return completion



    def _build_successful_object(self, response, **kwargs):
        event_name = kwargs.get("event_name", None)
        reference_id = kwargs.get("reference_id", None)
        user_id = kwargs.get("user_id", None)
        data = {
            "request_id": response.id,
            "request_model": response.model,
            "request_object": response.object,
            "prompt_tokens": response.usage.prompt_tokens,
            "completion_tokens": response.usage.completion_tokens,
            'reference_id': reference_id,
            "user_id": user_id,
            "event_name": event_name,
            "meta_data": {},
            "status": "success"
        }

        self._log_openai_request(data)

    def _build_failed_object(self, error, **kwargs):
        event_name = kwargs.get("event_name", None)
        reference_id = kwargs.get("reference_id", None)
        user_id = kwargs.get("user_id", None)

        meta_data = {'error': str(error)}

        data = {
            "request_id": None,
            "request_model": None,
            "request_object": None,
            "prompt_tokens": 0,
            "completion_tokens": 0,
            'reference_id': reference_id,
            "user_id": user_id,
            "event_name": event_name,
            "meta_data": meta_data,
            "status": "failed"
        }

        self._log_openai_request(data)

    def _log_openai_request(self, data):
        serializer = OpenAIModelSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        else:
            raise serializers.ValidationError(serializer.errors)


class OpenAIChatbotService(OpenAIService):

    def __init__(self, user_data="", user_id=""):
        super().__init__()
        self.user_id = user_id
        self.user_data = user_data
        self.today = datetime.now()

    def get_response_for_prompt(self, user_prompt):

        system_prompt = (f"You are an AI Chatbot that interacts with a user having data : {self.user_data}"
                         f"Current Time: {self.today}")

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ]

        try:
            response = self.generate_response(
                messages=messages,
                max_tokens=1000,
                temperature=0.5,
                n=1,
                frequency_penalty=0.5,
            )

            self._build_successful_object(
                response=response,
                event_name="chatbot",
                user_id=self.user_id
            )
            content = response.choices[
                0].message.content if response.choices else "Response not generated."

            return content

        except Exception as e:
            self._build_failed_object(
                error=e,
                event_name="chatbot",
                user_id=self.user_id
            )
            raise serializers.ValidationError(f"Failed to process the transcript due to: {str(e)}")


    def get_response_for_command_search(self, command):

        system_prompt = f"""
        You are an AI designed to handle user requests and route them to the appropriate sections of the web application.
         The user will provide a search query or a command, and you will respond with the appropriate route URL for that command.

            Here are some example routes and their corresponding keywords:
            - "Dashboard" → dev/dashboard
            - "Projects" → dev/projects
            - "Tasks" → dev/tasks
            - "Alerts" → dev/alerts
            - "Notes" → dev/note-maker
            - "Assistant" → dev/assistant
            - "Profile" -> dev/profile
            
            If there is creation intent in the command prompt then it would be for Tasks, Projects, Notes
            return model_type as task, project, note respectively in that key
            
            Current Time : {self.today}
            
            If the query doesn't match any of the predefined routes, give route key as 'unknown'
            the format is {'route': The Route fetched, 'creation_intent': "true" or "false",
            'model_type': if there is creation intent then model type else give an empty string ""}
        """

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": command},
        ]

        try:

            class Route(BaseModel):
                route: str
                creation_intent: str
                model_type: str

            response = self.generate_structured_response(
                messages=messages,
                response_format=Route,
                temperature=0.5,
                n=1,
                frequency_penalty=0.5,
            )

            self._build_successful_object(
                response=response,
                event_name="command-search",
                user_id=self.user_id
            )
            content = response.choices[
                0].message.content if response.choices else "Response not generated."

            content_dict = json.loads(content)

            return content_dict

        except Exception as e:
            self._build_failed_object(
                error=e,
                event_name="chatbot",
                user_id=self.user_id
            )
            raise serializers.ValidationError(f"Failed to process the transcript due to: {str(e)}")

    def create_model_object_from_command(self, command, model_type):

        if model_type == 'note':
            task_objs = Task.objects.all().filter(user_id=self.user_id).prefetch_related(
                "notes"
            ).order_by('-id')
            tasks_dict = UserTaskSerializer(task_objs, many=True).data
            system_prompt = f"""
                Based on the details in the command provided fill the note creation form.
                Use the details of tasks for summarizing and insight queries: {tasks_dict}
                Current Time : {self.today}
             """
        else:
            system_prompt = """
                Based on the details in the command provided fill the model creation form.
            """

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": command},
        ]

        try:

            model_name = MODEL_REGISTRY.get(model_type)
            pydantic_model = PYDANTIC_MODEL_REGISTRY.get(model_name)

            response = self.generate_structured_response(
                messages=messages,
                response_format=pydantic_model,
                temperature=0.5,
                n=1,
                frequency_penalty=0.5,
            )

            self._build_successful_object(
                response=response,
                event_name="create-object",
                user_id=self.user_id
            )
            content = response.choices[
                0].message.content if response.choices else "Response not generated."

            content_dict = json.loads(content)

            model_obj = create_object(model_name, self.user_id, **content_dict)

            return model_obj

        except Exception as e:
            self._build_failed_object(
                error=e,
                event_name="chatbot",
                user_id=self.user_id
            )
            raise serializers.ValidationError(f"Failed to process the transcript due to: {str(e)}")




