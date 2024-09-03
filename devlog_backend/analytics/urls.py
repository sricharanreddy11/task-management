from django.urls import path, include
from rest_framework.routers import DefaultRouter

from analytics.views import ChatbotAPI

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('chatbot', ChatbotAPI.as_view()),
]
