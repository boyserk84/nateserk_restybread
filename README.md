# Nateserk RestyBread

[![Dependency status](https://david-dm.org/boyserk84/nateserk_restybread.svg)](https://david-dm.org/boyserk84/nateserk_restybread)

# Description
Boilerplate for quickly build C.R.U.D Rest(ful) API with Node.js and Hapi.js.

## Requirements
* Node.js (version 6 or above)
* NPM

# List of Rest API Endpoint Ready Out of the box
```
POST    http://localhost:8000/content
GET     http://localhost:8000/content/{id}
PUT     http://localhost:8000/content/{id}
DELETE  http://localhost:8000/content/{id}
```

# Update/Changelog
* 05/15/2017 Version 1.0.0
* CRUD endpoint for the given id of data.
* Support 'Google DataStore'

# How to Guide
### Step 1: Installation
After cloning the repository and change your directory to where this project's root is located,
run the following command to install all project dependencies:
```
npm install
```

### Step 2: Launching Node Server Instance with REST API
```
npm start
```

### Step 3: Test API endpoint
Run cURL commands
```
curl -XGET "http://localhost:8000/example"
```

If you see the following message,
```
{"text": "Here is the sample response!"}
```

Congratulation! You have successfully launched API endpoint.


# Application Folder Structures

```
package.json        All Node.JS application dependencies.
index.js            Main Node.js for launching and running API instance.
src/    
|-config/                   Configuration folder
  |-constants.js            Constants values for the entire application.
  |-.env                    Environment and configuration for the entire application.
|-controllers/              Controllers/Manager folder
  |-ContentController.js    ContentController for handling request/reply for its corresponding route.
|-models/                   Models folder (mapping DAO to model object)
  |-BaseModel.js            BaseModel object for serialize and deserialize JSON data.
|-routes/                   Routes folder
  |-content.js              API route endpoint for 'content'
|-middlewares/              Middleware folder (Auth, database, bridge)
  |-googledatastore.js      Adapter for connecting to Google DataStore
|-dao/                      Direct Access Object folder (all objects interact with DB.)
  |-basedao.js              Base DAO for common functionality
  |-contentdao.js           ContentDAO extends from BaseDAO
```
