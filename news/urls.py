from django.urls import path

from news.views import news_list, news_detail, news_by_tag, news_stats

urlpatterns = [
    path('', news_list, name='news_list'),
    path('<int:pk>/', news_detail, name='news_list'),
    path('tag/<str:tag>/', news_by_tag, name='news_by_tag'),
    path('stats/', news_stats, name='news_stats')
]
