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

    _GetById(id) {
      // Example, feel free to comment out and re-implement
      var model = new ContentModel();
      model.FromJSON("{ \"created_at\": 1234567 }");
      model.id = id;

      // TODO: integrate with BOOM
      return { data: model };
    }

    _Create(params) {
      var model = new ContentModel();
      // TODO: Implement this
      return model;
    }

    _Delete(id) {
      // TODO: Implement this
      return { code: 200 };
    }

    _Update(id, params) {
      // TODO: Implement this
      return { code: 200 };
    }
}

module.exports = ContentController;
