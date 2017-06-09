# Google DataStore Setup Guide
Author: Nate K (nkemavaha@gmail.com)

# Requirements
* Google Cloud Account
* Google Cloud Project
* GCloud SDK https://cloud.google.com/sdk/gcloud/


# Setup Guide
* Once you have Google Cloud Account, you'll need to create a project and attach Google Datastore to this project.
* Go to Google DataStore by typing in `datastore` in a search box in Google Cloud console (https://console.cloud.google.com).
* Go to `Entities` and Click `CREATE ENTITY`. This basically defines your JSON data structure.
* Name `Kind` of your new entity. This is similar to `table name` in the relational database.
* `Key identifier` is basically auto-generated numeric ID. You can change it to custom name if you have a different pattern or format for ID.
* Add `properties` to your entity. This is similar to adding `column` in the relational database.

# Setup Indexing Guide
Unlike MYSQL or relational database, indexing is required for query or quick look up your data/entity.
If you did not have any complex query (i.e. only single property query), `built-in index` will be used and there is no need to setup one.

However, if there are multiple properties in a query, `composite indexes` are required and need to be configured beforehand.

# What you will need
* index.yaml
* gcloud SDK

# First time Setup

1. Run the following and make sure the correct project is being used:
```
gcloud init
```

2. Define and configure your indexes in `index.yaml`. See https://cloud.google.com/datastore/docs/tools/indexconfig.

# Create or Update Indexing
1. Run the following command to setup or update indexes:
```
sh scripts/gdatastore_indexing.sh create
```

2. It will take awhile for Google DataStore to compute your indexes.
Check your Google DataStore Console. Click `Indexes` tab and see if your indexes status is `serving`.
Otherwise, you may get indexing not ready error message.

# Clean Up Indexing
Run the following command to setup or update indexes:
```
sh scripts/gdatastore_indexing.sh delete
```

# Note for composite indexes:
* All properties defined in a query must exactly match index definitions in `index.yaml`. Otherwise, you will get `no matching index found.`.
* You can have multiple indexing defined in `index.yaml`.


# Integrate DataStore to your Application
If you are running your application (externally outside Google Cloud), service account key is required for authentication.
1. You will need to setup a service account. See `Setting up a service account` at  https://cloud.google.com/docs/authentication#getting_credentials_for_server-centric_flow.
2. Once the setup is done, there will be JSON file contains your key (aka credentials) to download to your computer or server.
3. In `src/config/.env`, you will need to define `GCLOUD_DATASTORE_KEY_PATH` to your service account JSON key path.
