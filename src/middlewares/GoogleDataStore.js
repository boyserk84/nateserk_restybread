/**
* File: middleware/GoogleDataStore.js
* GoogleDataStore middleware.
* This is a wrapper for all operations related Google DataStore.
* @author Nate K. (nkemavaha@gmail.com)
*/
'use strict';

const DataStore = require('@google-cloud/datastore');

class GoogleDataStore {

  constructor(projId, pathToKey, kind) {
      this._dataStore = new DataStore(
        {
          projectId: projId,  // see https://cloud.google.com/datastore/docs/reference/libraries#client-libraries-install-nodejs
          keyFileName: pathToKey  // see https://cloud.google.com/docs/authentication#getting_credentials_for_server-centric_flow
        }
      );

      this._kind = kind;
  }

  /**
  * Retrieve data of the given Id from the given kind.
  * @param id         Identifier
  * @param callback   Callback
  */
  Get(id, callback) {
      let key = this._dataStore.key([ this._kind, id]);
      this._dataStore.get(key,
          function(err, entity)
          {
              if ( err ) {
                  // TODO: Log this
                  console.log( err );
              }

              if ( callback && typeof(callback) === 'function' ) {
                callback( entity );
              }
          }
      );
      // this._dataStore.runQuery(query,
      //     function(err, result)
      //     {
      //         if ( err ) {
      //           // TODO: Log Error
      //           console.log(err);
      //           result = [];
      //         }
      //
      //         if ( callback && typeof(callback) === 'function') {
      //           callback(result);
      //         }
      //     }
      // );
  }

  /**
  * Create a new data.
  * @param id             Name/Identifier in GoogleDataStore
  * @param dataObj        Data object
  * @param callback       Callback
  */
  Create( id, dataObj, callback) {
    const dataStoreKey = this._dataStore.key([this._kind, id]);
    this._dataStore.save( { key: dataStoreKey, data:dataObj },
      function(err) {
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
