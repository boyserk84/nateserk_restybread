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

            // Otherwise, we return false.
            callback(false);
        }

      });
    }

    Update(callback) {
      // TODO: Test this
      this.model.updated_at = Moment().unix();
      let newCAS = this.model.GenerateCAS();
      let data = this.model;
      let id = this.model.id;
      let cas = this.model.cas;

      // First fetch CAS data
      this.Get( function(result) {
        if ( result ) {
            // If CAS data matches then we allow UPDATE operation.
            if ( result.cas === cas ) {
              data.cas = newCAS;  // Regenerate a new CAS
              this.database.Update( id, data, callback );
              return;
            }

            // Otherwise, we return false.
            callback(false);
        }
      } );


    }

    Get(callback) {
      this.database.Get( this.model.id, callback );
    }

    Query(params, callback) {

    }

}

module.exports = BaseDAO;
