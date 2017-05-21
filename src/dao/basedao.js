/**
* basedao.js
* dao/basedao.js
* Base Direct Access Object. It has a dependency injection.
*
* @author Nate K. (nkemavaha@gmail.com)
*/
'use strict';

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
      // TODO: Check if atomic ensure or CAS is needed.
      this.database.Delete( this.model.id, callback );
    }

    Update(callback) {

    }

    Get(callback) {
      this.database.Get( this.model.id, callback );
    }

    Query(params, callback) {

    }

}

module.exports = BaseDAO;
