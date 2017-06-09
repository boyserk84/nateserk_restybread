/**
* File: middleware/GoogleDataStore.js
* GoogleDataStore middleware.
* This is a wrapper for all operations related Google DataStore.
* @author Nate K. (nkemavaha@gmail.com)
*/
'use strict';

const DataStore = require('@google-cloud/datastore');
const BaseDBMiddleware = require('./basedbmiddleware');

const isArray = require('isarray'); // This probably is JOI dependency.

class GoogleDataStore extends BaseDBMiddleware {

  /**
  * Default Constructor
  * @param projId         Google Project Id
  * @param pathToKey      Path to a fileName containing auth credential key
  * @param kind           Kind (aka namespace or name of the table)
  */
  constructor(projId, pathToKey, kind) {
      super();
      this._dataStore = new DataStore(
        {
          projectId: projId,  // see https://cloud.google.com/datastore/docs/reference/libraries#client-libraries-install-nodejs
          keyFileName: pathToKey  // see https://cloud.google.com/docs/authentication#getting_credentials_for_server-centric_flow
        }
      );

      this._kind = kind;
  }

  /**
  * Helper method to parse a generic query object into Google Query object.
  * @param query          Query Object
  */
  ParseAndConstructQuery(query) {
    let limit = 50;
    // construct a query
    let gquery = this._dataStore.createQuery(this._kind);

    if ( query.filters ) {
      for (let i = 0; i < query.filters.length; ++i ) {
        let filter = query.filters[i];
        if ( filter && filter.prop && filter.val && filter.opt) {
          gquery.filter(filter.prop, filter.opt , filter.val );
        }
      }//for
    }

    // By default, sort descending is true
    let sortDesc = ( typeof query.SortDescending !== 'undefined' )? query.SortDescending: true;

    if ( query.sortByProp ) {
      gquery.order( query.sortByProp, { descending: sortDesc } );
    }

    if ( query.limit ) {
      gquery.limit( query.limit );
    } else {
      gquery.limit(limit);
    }

    return gquery;
  }

  /**
  * Retrieve data based on the given query.
  * NOTE: configure index.yaml is required.
  * See `scripts/gdatastore_indexing.sh` and `src/config/gdatastore_index/index.yaml`.
  * See: https://cloud.google.com/datastore/docs/tools/indexconfig
  * @param query          Generic query object
  * @param callback
  */
  Query(query, callback) {
    let gquery = this.ParseAndConstructQuery(query);

    this._dataStore.runQuery(gquery,
        function(err, result)
        {
            if ( err ) {
              // TODO: Log Error
              console.log(err);
              result = [];
            }

            if ( callback && typeof(callback) === 'function') {
              callback(result);
            }
        }
    );
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
                  callback( false );
                  return;
              }

              if ( callback && typeof(callback) === 'function' ) {
                callback( entity );
              }
          }
      );
  }

  /**
  * Create a new data.
  * @param id             Name/Identifier in GoogleDataStore
  * @param dataObj        Data object
  * @param callback       Callback
  */
  Create( id, dataObj, callback) {
    const dataStoreKey = this._dataStore.key([this._kind, id]);
    // Insert - Id must be unique.
    this._dataStore.insert( { key: dataStoreKey, data:dataObj },
      function(err) {
          if ( err ) {
            // TODO: Log error
            console.log(err);
          }
          if ( callback ) {
            callback( (err)?false:true );
          }
      }
    );
  }

  /**
  * Delete data/row of the given Id
  * @param id
  * @param callback
  */
  Delete(id, callback) {
    const dataStoreKey = this._dataStore.key([this._kind, id]);
    this._dataStore.delete( dataStoreKey,
      function(err) {
          if ( err ) {
            // TODO: Log error
            console.log(err);
          }
          if ( callback ) {
            callback( (err)?false:true );
          }
      }
    );
  }
  /**
  * Batch operation for delete
  * @param ids          List of all ids
  * @param callback
  */
  BatchDeleteByIds(ids, callback) {
      if ( !isArray(ids) ) {
        console.log("BatchDeleteByIds parameter='ids' is NOT array.");
        if ( callback ) {
            callback( false );
        }
        return;
      }

      let keys = [];
      for(let i = 0; i < ids.length ; ++i) {
        keys.push( this._dataStore.key( [ this._kind, ids[i] ] ) );
      }//for

      if ( keys.length > 0 ) {
          this._dataStore.delete(keys,
            function(err) {
                if ( err ) {
                  // TODO: Log error
                  console.log(err);
                }

                if ( callback ) {
                    callback( (err)?false:true );
                }

            }
          );
      } else {
        console.log("BatchDeleteByIds empty 'ids' array.");
        if ( callback ) {
            callback( false );
        }
      }
  }

  /**
  * Update data/row of the given Id
  * @param id
  * @param newData
  * @param callback
  */
  Update(id, newData, callback) {
    // NOTE: There is NO partial update for Google Data Store unlike MongoDB.
    const dataStoreKey = this._dataStore.key([this._kind, id]);
    this._dataStore.update( { key: dataStoreKey, data: newData },
      function(err) {
          if ( err ) {
            // TODO: Log error
            console.log(err);
          }
          if ( callback ) {
            callback( (err)?false:true );
          }
      }
    );
  }


}

module.exports = GoogleDataStore;
