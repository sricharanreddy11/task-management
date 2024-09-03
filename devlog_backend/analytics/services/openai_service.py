from openai import OpenAI
from rest_framework import serializers

from analytics.serializers import OpenAIModelSerializer
from devlog.settings import env


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

    def get_response_for_prompt(self, user_prompt):

        system_prompt = f"You are an AI Chatbot that interacts with a user having data : {self.user_data}"

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
