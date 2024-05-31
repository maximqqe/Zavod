from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'tag'
        verbose_name = 'tag'
        verbose_name_plural = 'tags'

    def __str__(self):
        return self.name


class News(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField(max_length=1000)
    image = models.ImageField(upload_to='img/')
    tags = models.ManyToManyField(to=Tag)
    views = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    dislikes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'news'
        verbose_name = 'news'
        verbose_name_plural = 'news'

    def __str__(self):
        return self.title
