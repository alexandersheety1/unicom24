from __future__ import absolute_import, unicode_literals
from zipfile import ZipFile
from django.core.mail import EmailMessage
from django.conf import settings
import os
from unicom24.celery import app


@app.task
def send_email(currentjob, gallery):
    try:
        username = currentjob.user.username
        zippath = os.path.join(settings.MEDIA_ROOT, username + ".zip")
        if os.path.exists(zippath):
            os.remove(zippath)
        with ZipFile(zippath, "w") as newzip:
            for g in gallery:
                newzip.write(os.path.join(settings.MEDIA_ROOT, g.image.name))
        email = EmailMessage(
            'Архив с изображениями',
            'Архив',
            settings.DEFAULT_FROM_EMAIL,
            [currentjob.user.email],
        )
        email.attach_file(zippath)
        email.send()
        currentjob.type = 3
        os.remove(zippath)
    except Exception as e:
        currentjob.type = 4
    currentjob.save()


if __name__ == '__main__':
    app.start()
