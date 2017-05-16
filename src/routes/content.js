/**
* Content.js Route
* File: routes/content.js
* API Routing endpoint for 'Content'. This is ONLY doing routing and validation parameters before passing to its controller.
* @author Nate K.
*/
'use strict';

var Joi = require('joi');
const ContentController = require('../controllers/ContentController.js');

exports.register = function(server, options, next) {

    // Get configuration from 'options'
    // TODO: Uncomment this once we have config object.
    //if ( options.config == null )
    //{
        //throw ("[ExceptionError] 'config' object is null!");
    //}

    // Setup the controller or manager
    var manager = new ContentController();

    if (manager)
    {
      // Binds all methods
      // similar to doing `contentsController.index.bind(contentsController);`
      // when declaring handlers
      server.bind(manager);

      // Declare routes
      // API End points for Contents
      server.route([
          {
              method: 'GET', path: '/content',
              config: {
                  handler: manager.GetMultiple,
                  validate: {
                      query: Joi.object().keys({
                          start: Joi.number().min(0),
                          limit: Joi.number().min(1)
                      })
                  }
              }
          },
          {
              method: 'GET', path: '/content/{id}',
              config: {
                  handler: manager.Get,
                  validate: {
                      params: {
                        id: Joi.string().required()
                          //id: Joi.string().regex(/[a-zA-Z0-9]{16}/)
                      }
                  }
              }
          },
          {
              method: 'POST', path: '/content',
              config: {
                  handler: manager.Create,
                  validate: {
                      payload: Joi.object().length(1).keys({
                          task: Joi.string().required().min(1).max(60)
                      })
                  }
              }
          },
          {
              method: 'PUT', path: '/content/{id}',
              config: {
                  handler: manager.Update,
                  validate: {
                      params: {
                          id: Joi.string().regex(/[a-zA-Z0-9]{16}/)
                      },
                      payload: Joi.object().length(1).keys({
                          task: Joi.string().required().min(1).max(60)
                      })
                  }
              }
          },
          {
              method: 'DELETE', path: '/content/{id}',
              config: {
                  handler: manager.Delete,
                  validate: {
                      params: {
                          id: Joi.string().regex(/[a-zA-Z0-9]{16}/)
                      }
                  }
              }
          }
      ]);
      next();

    } else {
      throw ("[ExceptionError] manager in routes/content.js is undefined or null!");
    }
}

exports.register.attributes = {
    name: 'routes-content',
    version: '1.0.0'
};
