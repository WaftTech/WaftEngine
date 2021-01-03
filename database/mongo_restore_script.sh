#!/bin/bash
DB=waft-engine
SERVER=ds155164.mlab.com
PORT=55164
USER=wafttech
PASSWORD=abcd#1234
# COLLECTIONS=$(mongo $SERVER:$PORT/$DB -u $USER -p $PASSWORD --quiet --eval "db.getCollectionNames()" | grep \" | tr -d '\[\]\"[:space:]' | tr ',' ' ')
COLLECTIONS=$(ls ./waftengine | grep \.json$ | tr -d '\[\]\"[:space:]' | tr ',' ' ')
echo "$COLLECTIONS"
# for collection in $COLLECTIONS; do
#     echo "Exporting $DB/$collection ..."
#     mongoimport --uri mongodb+srv://wafttech:wafttech@wafttech.quitr.mongodb.net/saathimart --collection $collection --type JSON --file ./waftcommerce/$collection.json
# done
