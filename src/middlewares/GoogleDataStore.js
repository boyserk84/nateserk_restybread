/**
* File: middleware/database.js
* @author Nate K. (nkemavaha@gmail.com)
*/
'use strict';

const DataStore = require('@google-cloud/datastore');

class GoogleDataStore {

  constructor(projId, pathToKey) {
      this._dataStore = new DataStore(
        {
          projectId: projId,  // see https://cloud.google.com/datastore/docs/reference/libraries#client-libraries-install-nodejs
          keyFileName: pathToKey  // see https://cloud.google.com/docs/authentication#getting_credentials_for_server-centric_flow
        }
      );
  }

  Get(id, key, callback) {
      // TOOD: Integrate to SELECT By ID
      const dbKey = this._dataStore.key(['recordkeeper', key]);
      this._dataStore.get(dbKey,
        function(err, entity){
          if ( callback ) {
            callback( (err)?false:entity);
          }
        }
      );
  }

  Create(dbKey, dataObj, callback) {
    let arr = [];
    for (var prop in dataObj) {
        arr.push(
          { name: prop,
            value: dataObj[prop]
          }
        );
    }//for

    const entity = {
      key: dbKey,
      data: arr
    };

    this._dataStore.save(entity,
      function(err) {
          // TODO: Log

          if ( callback ) {
            callback( (err)?false:true );
          }
      }
    );
  }

  Save(key, data, callback) {
  }

  Delete(key, id, callback) {

  }


}

module.exports = GoogleDataStore;
