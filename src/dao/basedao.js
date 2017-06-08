/**
* basedao.js
* dao/basedao.js
* Base Direct Access Object. It has a dependency injection.
*
* @author Nate K. (nkemavaha@gmail.com)
*/
'use strict';

const Moment = require('moment');

class BaseDAO {

    constructor(model, dbAdapter) {

      if ( !dbAdapter ) {
         console.log("Database Adapter/Middleware is missing!");
         throw("Database adapter/middleware is undefined!");
      }

      this.model = model;
      this.database = dbAdapter;
    }

    Get(callback) {
      this.database.Get( this.model.id, callback );
    }

    Create(callback) {
      this.database.Create( this.model.id, this.model, callback );
    }

    Delete(callback) {
      let cas = this.model.cas;
      let id = this.model.id;
      let db = this.database;

      // First fetch CAS data
      this.Get( function(result) {
        if ( result ) {
            // If CAS data matches then we allow DELETE operation.
            if ( result.cas === cas ) {
              db.Delete( id, callback );
              return;
            }

            console.log("CAS mismatch");

            // Otherwise, we return false.
            callback(false);
        }

      });
    }

    Update(callback) {
      let data = this.model;
      let id = this.model.id;
      let cas = this.model.cas;
      let that = this;
      let db = this.database;

      // First fetch CAS data
      this.Get( function(result) {
        if ( result ) {
            // If CAS data matches then we allow UPDATE operation.
            if ( result.cas === cas ) {
              data = that._MergeData( result, data );  // Merge data if partial update isn't allowed.
              data.cas = data.GenerateCAS();  // Regenerate a new CAS
              data.updated_at = Moment().unix();  // update unix timestamp

              db.Update( id, data, callback );
              return;
            }

            console.log("CAS mismatch!");

            // Otherwise, we return false.
            callback(false);
        }
      } );
    }

    /**
    * Merge remote data with the current model
    * NOTE: This is used if partial update functionality isn't available from DB adapter.
    * @param remoteData       Remote data (JSON data)
    * @param model            Model (local data -- strongly typed)
    */
    _MergeData(remoteData, model ) {
      throw("Child DAO must implement '_MergeData' method!");
    }

    Query(query, callback) {
      this.database.Query( query, callback );
    }

    BatchDeleteByIds(ids, callback) {
      this.database.BatchDeleteByIds( ids, callback );
    }

}

module.exports = BaseDAO;
