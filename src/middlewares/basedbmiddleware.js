/**
* File: middleware/BaseDBMiddleware.js
* Base Database middleware.
* This conceptually acts as an interface for all database middleware classes.
* @author Nate K. (nkemavaha@gmail.com)
*/
'use strict';

class BaseDBMiddleware {

  Query(query, callback) {
    throw("Child class must implement 'Query' method!");
  }

  Get(id, callback) {
    throw("Child class must implement 'Get' method!");
  }

  Create( id, dataObj, callback) {
    throw("Child class must implement 'Create' method!");
  }

  Delete(id, callback) {
    throw("Child class must implement 'Delete' method!");
  }

  Update(id, data, callback) {
    throw("Child class must implement 'Update' method!");
  }
}
module.exports = BaseDBMiddleware;
