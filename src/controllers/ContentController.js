/**
* ContentController.js
* File: controllers/ContentController.js
* Controller or manager for handling request, fetch and process data and reply back the response.
* @author Nate K.
*/
'use strict';

//var Boom = require('boom');
const BaseCRUDController = require('./BaseCRUDController');
const ContentModel = require('../models/ContentModel');

class ContentController extends BaseCRUDController{
    constructor() {
      super();
    }

    Get(request, reply) {
      // Example, feel free to comment out and re-implement
      var model = new ContentModel();
      model.FromJSON("{ \"created_at\": 1234567 }");
      model.id = request.params.id;
      reply(model);
    }
}

module.exports = ContentController;
