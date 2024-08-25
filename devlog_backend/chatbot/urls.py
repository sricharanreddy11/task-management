from django.urls import path, include
from rest_framework.routers import DefaultRouter

from chatbot.views import ChatbotAPI

router = DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),
    path('ai', ChatbotAPI.as_view())
]
