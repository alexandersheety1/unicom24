Фронт на Vue уже собран

Настроить почту для выгрузки изображений на почту в settings.py:

EMAIL_HOST = 'smtp.yandex.ru'

DEFAULT_FROM_EMAIL = "test-unicom24-new@yandex.ru"

EMAIL_HOST_USER = "test-unicom24-new@yandex.ru"

EMAIL_HOST_PASSWORD = ""

-------------------------

Установка:

Запуск докера:

1. docker-compose up

все остальное сделает докер

сайт будет доступен по адресу 127.0.0.1

-----------
Запуск без докера:
1. Установить в settings.py DOCKER=False
2. Установить миграции python manage.py migrate
3. Запустить




