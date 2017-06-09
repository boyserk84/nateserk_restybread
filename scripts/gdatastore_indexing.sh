#!/bin/bash
# Google DataStore Indexing Script
# This will fetch the index configuration from `index.yaml` and push it to Google Cloud.
# Author: Nate K. (nkemavaha@gmail.com)
#
# See https://cloud.google.com/datastore/docs/tools/#the_development_workflow_using_gcloud
#
# NOTE:
# - Make sure to run `gcloud init` to have configuration pointing to the correct project.
#
#################
# Instructions
#################
#
# To create/update indexing: Run the following command,
#     sh gdatastore_indexing.sh create
# To clean up/remove indexing: Run the following command,
#     sh gdatastore_indexing.sh delete

indexing_file_path="../src/config/gdatastore_index/index.yaml"

if [ -f "$indexing_file_path" ]; then
  if [ "$1" != "" ]; then
    if [ "$1" == "create" ]; then
      # CREATE INDEXES
      echo "Creating Google DataStore Indexes from index.yaml.\n"
      gcloud datastore create-indexes $indexing_file_path
    elif [ "$1" == "delete" ]; then
      # CLEAN UP INDEXES
      echo "Cleaning up Google DataStore Indexes specified in index.yaml.\n"
      gcloud datastore cleanup-indexes $indexing_file_path
    else
      echo "Unknow command '$1'. Abort!\n"
    fi
  else
    echo "Missing a command. Abort! \n"
  fi
else
  echo "'index.yaml' does not exist in src/config/gdatastore_index/ directory. Abort!\n"
fi
