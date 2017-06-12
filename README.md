# Nateserk RestyBread

[![Dependency status](https://david-dm.org/boyserk84/nateserk_restybread.svg)](https://david-dm.org/boyserk84/nateserk_restybread)

# Description
Boilerplate and building block for quickly build C.R.U.D Rest(ful) API with Node.js and Hapi.js.

## Requirements
* Node.js (version 6 or above)
* NPM

# List of Rest API Endpoint Ready Out of the box
```
POST    http://localhost:8000/content           Create a new content
GET     http://localhost:8000/content/{id}      Fetch the content
PUT     http://localhost:8000/content/{id}      Update the content
DELETE  http://localhost:8000/content/{id}      Delete the content
POST    http://localhost:8000/contents          Query multiple contents
DELETE  http://localhost:8000/contents          Delete multiple contents
```

# Update/Changelog

* 06/09/2017 Version 1.0.1
```
* Support `JWT` (Json Web Token) Authentication strategy.
* Support `Auth0` Authentication strategy (Pending).
```

* 05/15/2017 Version 1.0.0
```
* CRUD `content` endpoint for the given id of data.
* Query `content` endpoint.
* Batch DELETE operation on `content` endpoint.
* Support `Google DataStore` integration as a database.
```

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
documentation/      Additional documentations for setting up dependencies (i.e. Google DataStore)
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
  |-database
    |-googledatastore.js    Adapter for connecting to Google DataStore
  |-authentication
    |-jwt_auth              JWT Authentication Strategy
|-dao/                      Direct Access Object folder (all objects interact with DB.)
  |-basedao.js              Base DAO for common functionality
  |-contentdao.js           ContentDAO extends from BaseDAO
```

# Application Flow
At the high level, the application can be described as the following diagram:
```
Route => Controller => Model => DAO => Middleware
```

* `Route` is responsible for validation and routing to an appropriate controller.
* `Controller` is responsible for gathering all user inputs, construct a strongly type data (model) from it and pass to DAO.
* `Model` is responsible for serialize and deserialize data. It basically takes care of itself (i.e. update CAS, timestamp and etc).
* `DAO` is responsible for communicate, translate, and bridge the gap between model and middleware (i.e. check for CAS before update/delete).
* `Middleware` is basically a low-level operation (i.e. CRUD operations for database). This should be lean and simple.

# How to Add a new API Endpoint
Generally, you will need the followings:
* Route
* Controller
* Model
* DAO

Once you have all these setup, you will need to register your route to `index.js`.
For instance,
```
{
    register: YOUR_ROUTE,
    options: {
        adapter: YOUR_DB_ADAPTER_INSTANCE,
        YOUR_OTHER_ATTRIBUTE: YOUR_OTHER_INSTANCE
    }
}
```

You can see example from `content` API endpoint.
It has `routes/content`, `controllers/ContentController`, `models/content`, and `dao/content`.
