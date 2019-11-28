FROM python:3.6.2
ENV PYTHONUNBUFFERED 1
RUN mkdir /unicom24
WORKDIR /unicom24
RUN mkdir front
RUN mkdir front/media
RUN mkdir gallery
RUN mkdir unicom24
ADD gallery/ gallery
ADD front/static/ front/static
ADD unicom24/ unicom24
ADD ./manage.py /unicom24
ADD ./uwsgi.ini /unicom24
ADD ./uwsgi_params /unicom24
ADD ./requirements.txt /unicom24

RUN pip install -r requirements.txt
#RUN ./manage.py migrate