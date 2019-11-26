FROM python:3.6.2
ENV PYTHONUNBUFFERED 1
RUN mkdir /unicom24
WORKDIR /unicom24
COPY ./gallery /unicom24
COPY ./front /unicom24
COPY ./unicom24 /unicom24
COPY ./manage.py /unicom24
COPY ./uwsgi.ini /unicom24
COPY ./uwsgi_params /unicom24
COPY ./requirements.txt /unicom24
RUN pip install -r requirements.txt
RUN ./manage.py collectstatic --noinput
RUN ./manage.py migrate
