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


  _GetById(id) { throw("unimplemented in the child controller."); }
  _Create(params) { throw("unimplemented in the child controller."); }
  _Update(id, params) { throw("unimplemented in the child controller."); }
  _Delete(id) { throw("unimplemented in the child controller."); }
  _GetMultiple(params) { throw("unimplemented in the child controller."); }

  Get(request, reply) {
      this._GetById(request.params.id, function(response) { reply(response); } );
  }

  GetMultiple(request, reply) {
      reply( this._GetMultiple(request.params) );
  }

  Create(request, reply) {
      this._Create(request.params, function(response) { reply(response); } );
  }

  Update(request, reply) {
      reply( this._Update(request.params.id, request.params) );
  }

  Delete(request, reply) {
      reply( this._Delete(request.params.id) );
  }
}

module.exports = BaseCRUDController;
