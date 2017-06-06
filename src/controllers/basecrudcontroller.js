/**
* BaseCRUDController.js
* File: controllers/BaseCRUDController.js
* BaseCRUDController or manager for handling request, fetch and process data and reply back the response.
*
* @author Nate K.
*/
'use strict';

//var Boom = require('boom');

class BaseCRUDController {

  /**
  * List of Stub methods that need to implement in the child controller.
  */

  // TODO: Delete probably don't need internal stub method in the child class.


  _GetById(id, callback) { throw("unimplemented in the child controller."); }
  _Create(params, callback) { throw("unimplemented in the child controller."); }
  _Update(id, data, callback) { throw("unimplemented in the child controller."); }
  _Delete(id, cas, callback) { throw("unimplemented in the child controller."); }
  _Query(query, callback) { throw("unimplemented in the child controller."); }

  Get(request, reply) {
      this._GetById(request.params.id, function(response) { reply(response); } );
  }

  Query(request, reply) {
      this._Query(request.payload, function(response) { reply(response); } );
  }

  Create(request, reply) {
      this._Create(request.payload, function(response) { reply(response); } );
  }

  Update(request, reply) {
      this._Update(request.params.id, request.payload, function(response) { reply(response); });
  }

  Delete(request, reply) {
      this._Delete(request.params.id, request.payload.cas, function(response) { reply(response); } );
  }
}

module.exports = BaseCRUDController;
