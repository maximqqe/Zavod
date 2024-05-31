from rest_framework import serializers
from news.models import News, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name',)


class NewsSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = News
        fields = ('id', 'title', 'image', 'text', 'tags', 'likes', 'dislikes',)
        read_only_fields = ('id', 'likes', 'dislikes',)


class NewsStatsSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = News
        fields = ('id', 'title', 'tags', 'likes', 'dislikes', 'views')
        read_only_fields = ('id', 'likes', 'dislikes', 'views')
