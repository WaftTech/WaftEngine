FROM mongo:latest

ENV MONGO_DATA_DIR=/data/db \
    RESTORE_DIR=/data/backups \
    MONGO_LOG_DIR=/var/log/mongodb

RUN apt-get update && apt-get install -y cron netcat-traditional netcat-openbsd && \
    mkdir -p $MONGO_DATA_DIR && \
    mkdir -p $RESTORE_DIR && \
    mkdir -p $MONGO_LOG_DIR

WORKDIR     $MONGO_DATA_DIR


COPY ./scripts /scripts
COPY ./db $RESTORE_DIR

RUN chmod +rx /scripts/*.sh && \
    touch /.firstrun

ENV PORT 27017
EXPOSE 27017

CMD ["/scripts/run.sh"]

# CMD mongorestore -h mongo -d waft-engine /db
