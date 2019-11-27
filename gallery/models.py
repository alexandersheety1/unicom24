from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Gallery(models.Model):
    user = models.ForeignKey(
        User,
        verbose_name="Пользователь",
        on_delete=models.CASCADE

    )
    image = models.ImageField(
        verbose_name="Изображения"
    )

    def __str__(self):
        return "%s. %s" % (self.id, self.user.first_name)

    class Meta:
        verbose_name = 'Изображения'


class Comments(models.Model):
    user = models.ForeignKey(
        User,
        verbose_name="Пользователь",
        on_delete=models.CASCADE
    )
    image = models.ForeignKey(
        Gallery,
        verbose_name="Изображения",
        on_delete=models.CASCADE
    )
    text = models.CharField(
        max_length=1024,
        verbose_name="Комментарий"
    )

    def __str__(self):
        return "%s. %s" % (self.id, self.user.first_name)

    class Meta:
        verbose_name = 'Комментарии'


class Jobs(models.Model):
    user = models.ForeignKey(
        User,
        verbose_name="Пользователь",
        on_delete=models.CASCADE
    )
    STATUS_CHOICES = (
        (1, "Не запущена"),
        (2, "В процессе"),
        (3, "Выполнена"),
        (4, "Ошибка"),
    )
    type = models.IntegerField(
        choices=STATUS_CHOICES,
        default=1
    )

    def __str__(self):
        return "%s. %s" % (self.id, self.user.first_name)

    class Meta:
        verbose_name = 'Отправка на почту'
