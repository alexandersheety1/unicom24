FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY unicom24.conf /etc/nginx/sites-available/

RUN mkdir -p /etc/nginx/sites-enabled/\
    && ln -s /etc/nginx/sites-available/unicom24.conf /etc/nginx/sites-enabled/
RUN useradd -r /bin/bash www-data

CMD ["nginx", "-g", "daemon off;"]

