from __future__ import absolute_import, unicode_literals
from celery import Celery
import os
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'unicom24.settings')
if settings.DOCKER:
    app = Celery('unicom24', broker=settings.CACHES['default']['LOCATION'])
else:
    app = Celery('unicom24', broker='redis://localhost')

app.conf.update(
    result_expires=60,
    accept_content=['pickle', 'json'],
    task_serializer='pickle',
    result_serializer='pickle',
)
app.autodiscover_tasks()
