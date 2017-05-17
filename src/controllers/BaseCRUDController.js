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
  Get(request, reply) {
      throw("unimplemented in child controller.");
  }

  GetMultiple(request, reply) {
      throw("unimplemented in child controller.");
  }

  Create(request, reply) {
      throw("unimplemented in child controller.");
  }

  Update(request, reply) {
      throw("unimplemented in child controller.");
  }

  Delete(request, reply) {
      throw("unimplemented in child controller.");
  }
}

module.exports = BaseCRUDController;
