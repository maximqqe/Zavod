from django.urls import path
from rest_framework.routers import DefaultRouter

from api.views import NewsListCreateAPIView, NewsRetrieveUpdateDestroyAPIView, NewsStatsAPIView, NewsLikeAPIView, \
    NewsDislikeAPIView, NewsByTagAPIView

urlpatterns = [
    path('news/', NewsListCreateAPIView.as_view(), name='news_list_api'),
    path('news/<int:pk>/', NewsRetrieveUpdateDestroyAPIView.as_view(), name='news_retrieve_api'),
    path('stats/', NewsStatsAPIView.as_view(), name='news_stats_api'),
    path('like/<int:pk>/', NewsLikeAPIView.as_view(), name='like_api'),
    path('dislike/<int:pk>/', NewsDislikeAPIView.as_view(), name='dislike_api'),
    path('tag/<str:tag>/', NewsByTagAPIView.as_view(), name='news_by_tag_api')
]
