FROM node:latest AS dist-build

WORKDIR /usr/src/app
COPY package*.json .
COPY babel.config.json .
COPY src src
RUN npm install
RUN npm run build

FROM centos:8

RUN dnf -y up
RUN dnf -y install httpd mod_ssl

COPY --from=dist-build /usr/src/app/dist /var/www/app
COPY httpd/htaccess /var/www/app/.htaccess
COPY httpd/ssl.conf /etc/httpd/conf.d
COPY httpd/app.conf /etc/httpd/conf.d

EXPOSE 443

# SSL certificates
VOLUME ["/usr/ssl"]

CMD ["httpd", "-D", "FOREGROUND"]
