FROM python:3.6.2
WORKDIR /unicom24
COPY gallery/ gallery/
COPY front/static/ front/static/
COPY front/static/index.html front/index.html
COPY unicom24/ unicom24/
COPY manage.py .
COPY uwsgi.ini .
COPY requirements.txt .
RUN mkdir front/media/
RUN pip install -r requirements.txt
RUN id -u www-data &>/dev/null || useradd -r /bin/bash www-data
RUN chown -R www-data:www-data /unicom24
USER www-data
