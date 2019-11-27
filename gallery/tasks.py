from __future__ import absolute_import, unicode_literals
from celery import Celery
from zipfile import ZipFile
from django.core.mail import EmailMessage
from django.conf import settings
import shutil

app = Celery('tasks', broker='redis://localhost')
app.conf.update(
    result_expires=60,
    accept_content=['pickle', 'json'],
    task_serializer='pickle',
    result_serializer='pickle',
)


@app.task
def send_email(currentjob, gallery):
    try:
        username = currentjob.user.username
        zippath = settings.MEDIA_ROOT + username + ".zip"
        with ZipFile(zippath, "w") as newzip:
            for g in gallery:
                newzip.write(settings.MEDIA_ROOT + g.image.name)

        email = EmailMessage(
            'Архив с изображениями',
            'Архив с изображениями',
            settings.DEFAULT_FROM_EMAIL,
            [currentjob.user.email],
        )
        email.attach_file(zippath)
        email.send()
        shutil.rmtree(zippath)
    except:
        currentjob.type = 4
        currentjob.save()


if __name__ == '__main__':
    app.start()
