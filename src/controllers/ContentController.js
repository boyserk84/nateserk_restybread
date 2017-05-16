/**
* ContentController.js
* File: controllers/ContentController.js
* Controller or manager for handling request, fetch and process data and reply back the response.
* @author Nate K.
*/
'use strict';

//var Boom = require('boom');
const BaseModel = require('../models/BaseModel');

function ContentController() {
};

// [GET] /content/{id}
/**
* Getting data of the given Id.
* @param start
* @param limit
*/
ContentController.prototype.Get = function(request, reply) {

    // Example, feel free to comment out and re-implement
    var model = new BaseModel();
    model.FromJSON("{ \"created_at\": 1234567 }");
    model.id = request.params.id;
    reply(model);
};

// [GET] /content/
/**
* Getting multiple data
* @param id
*/
ContentController.prototype.GetMultiple = function(request, reply) {
  // TODO: Implement this
  reply({"code": "unimplemented!"});
};

// [POST] /content/
/**
* Create a new content data.
* @param  content
*/
ContentController.prototype.Create = function(request, reply) {
    // TODO: Implement this
    reply({"code": "success"});
};

// [PUT] /content/{id}
/**
* Update the given content Id with the given data
* @param id
* @param content
*/
ContentController.prototype.Update = function(request, reply) {
    // TODO: Implement this
    reply({"code": "success"});
};

// [DELETE] /content/{id}
/**
* Delete the given content Id
* @param id
*/
ContentController.prototype.Delete = function(request, reply) {
    // TODO: Implement this
    reply({"code": "success"});
};

module.exports = ContentController;
