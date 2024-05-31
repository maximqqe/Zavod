import pdb

from django.shortcuts import render


def news_list(request):
    return render(request, template_name='news/news_list.html')


def news_detail(request, pk):
    return render(request, template_name='news/news_detail.html')


def news_by_tag(request, tag):
    return render(request, template_name='news/news_by_tag.html')


def news_stats(request):
    return render(request, template_name='news/news_stats.html')
