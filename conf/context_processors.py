from news.models import Tag


def get_tags(request):
    tags = Tag.objects.all()
    return {'tags': tags}
