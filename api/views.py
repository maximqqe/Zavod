import pdb

from django.db.models import F
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import NewsSerializer, NewsStatsSerializer
from news.models import News


class NewsListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = NewsSerializer

    def get_queryset(self):
        offset = int(self.request.GET.get('offset', 0))
        amount = int(self.request.GET.get('amount', 3))
        queryset = News.objects.all()[offset:offset + amount]

        return queryset


class NewsRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NewsSerializer
    lookup_url_kwarg = 'pk'

    def get_queryset(self):
        news = News.objects.get(pk=self.kwargs['pk'])
        news.views += 1
        news.save()
        return News.objects.all()


class NewsStatsAPIView(generics.ListAPIView):
    serializer_class = NewsStatsSerializer

    def get_queryset(self):
        return News.objects.all()


class NewsLikeAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            news = News.objects.get(pk=self.kwargs['pk'])
            news.likes += 1
            news.save()
            serializer = NewsSerializer(news)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except News.DoesNotExist:
            return Response({"error": "News not found"}, status=status.HTTP_404_NOT_FOUND)


class NewsDislikeAPIView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            news = News.objects.get(pk=self.kwargs['pk'])
            news.dislikes += 1
            news.save()
            serializer = NewsSerializer(news)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except News.DoesNotExist:
            return Response({"error": "News not found"}, status=status.HTTP_404_NOT_FOUND)


class NewsByTagAPIView(generics.ListAPIView):
    serializer_class = NewsSerializer

    def get_queryset(self):
        offset = int(self.request.GET.get('offset', 0))
        amount = int(self.request.GET.get('amount', 3))
        queryset = News.objects.filter(tags__name=self.kwargs.get('tag'))[offset:offset+amount]
        return queryset


