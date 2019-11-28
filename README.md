Установка:

Запуск без докера:
1. Установить в settings.py DOCKER=False
2. Установить миграции python manage.py migrate
3. Запустить


Запуск c докером:

1. docker-compose up
2. docker exec unicom24_app ./manage.py migrate

Фронт на Vue уже собран