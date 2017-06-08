#!/bin/bash
# Google DataStore Indexing Script
# This will fetch the index configuration from `index.yaml` and push it to Google Cloud.
# Author: Nate K. (nkemavaha@gmail.com)
#
# See https://cloud.google.com/datastore/docs/tools/#the_development_workflow_using_gcloud
#
# NOTE:
# - Make sure to run `gcloud init` to have configuration pointing to the correct project.

# TODO: Make it a command line (create vs delete)

echo "CREATING INDEXES FOR GOOGLE DATASTORE from index.yaml.\n"
gcloud datastore create-indexes ../src/config/gdatastore_index/index.yaml

# Delete INDEXES
