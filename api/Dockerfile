FROM node:latest

WORKDIR /usr/src/app
COPY package*.json .
COPY src src
ENV NODE_ENV="production"
RUN npm ci --only=production
VOLUME ["/var/lib/varasto"]
EXPOSE 8080
ENTRYPOINT ["node", "src", \
        "--db-dialect", "sqlite", \
        "--db-storage", "/var/lib/varasto/db.sqlite", \
        "--db-logging", "false", \
        "--salt-rounds", "10", \
        "--host", "localhost", \
        "--port", "8080", \
        "--cron-schedule", "0 0 * * *", \
        "--transient-lifetime", "24"]
