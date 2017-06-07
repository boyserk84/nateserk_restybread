#!/bin/bash

# See https://cloud.google.com/datastore/docs/tools/#the_development_workflow_using_gcloud
# Make sure to run `gcloud init` to point to the correct project.

# TODO: Make it a command line (create vs delete)

echo "CREATING INDEXES FOR GOOGLE DATASTORE from index.yaml.\n"
gcloud datastore create-indexes ../src/config/gdatastore_index/index.yaml

# Delete INDEXES
