FROM python:3.6.2
ENV PYTHONUNBUFFERED 1
RUN mkdir /unicom24
RUN mkdir /unicom24/front
RUN mkdir /unicom24/front/media
RUN mkdir /unicom24/gallery
RUN mkdir /unicom24/unicom24
COPY gallery/ /unicom24/gallery
COPY front/static/ /unicom24/front/static
COPY front/dist/ /unicom24/front/dist
COPY unicom24/ /unicom24/unicom24
COPY manage.py /unicom24
COPY uwsgi.ini /unicom24
COPY uwsgi_params /unicom24
COPY requirements.txt /unicom24
WORKDIR /unicom24
RUN pip install -r requirements.txt
RUN chown -R www-data:www-data /unicom24
USER www-data
