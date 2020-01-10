#!/bin/bash
# Restore MongoDB

MONGODB_USERNAME=${MONGODB_USERNAME}
MONGODB_PASSWORD=${MONGODB_PASSWORD}
DB=${MONGODB_DBNAME}
RESTORE_DIR=/data/backups

echo "Restoring backup file $DB from $RESTORE_DIR"
/usr/bin/mongorestore --port 27017 -u $MONGODB_USERNAME -p $MONGODB_PASSWORD -d $DB $RESTORE_DIR/$DB