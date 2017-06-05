/**
* Content.js Route
* File: routes/content.js
* API Routing endpoint for 'Content'. This is ONLY doing routing and validation parameters before passing to its controller.
* @author Nate K.
*/
'use strict';

var Joi = require('joi');
const ContentController = require('../controllers/contentcontroller.js');

exports.register = function(server, options, next) {

    // Get configuration from 'options'
    // TODO: Uncomment this once we have config object.
    //if ( options.config == null )
    //{
        //throw ("[ExceptionError] 'config' object is null!");
    //}

    if ( !options.adapter )
    {
      throw("Database adapter is missing or undefined!");
    }

    // Setup the controller or manager
    var controller = new ContentController(options.adapter);

    if (controller)
    {
      // Binds all methods
      // similar to doing `contentsController.index.bind(contentsController);`
      // when declaring handlers
      server.bind(controller);

      // Declare routes
      // API End points for Contents
      server.route([
          {
              method: 'GET', path: '/content',
              config: {
                  handler: controller.Query,
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
                  handler: controller.Get,
                  validate: {
                      params: {
                        id: Joi.string().required()
                      }
                  }
              }
          },
          {
              method: 'POST', path: '/content',
              config: {
                  handler: controller.Create,
                   validate: {
                      // TODO: Test this validation
                       payload: {
                           title: Joi.string().required().min(1),
                           desc: Joi.string()
                       }
                   }
              }
          },
          {
              method: 'PUT', path: '/content/{id}',
              config: {
                  handler: controller.Update,
                  validate: {
                      params: {
                          id: Joi.string().required()
                      },
                      payload: {
                          cas : Joi.string().required(),
                          title: Joi.string(),
                          desc: Joi.string(),
                          published_at: Joi.date().timestamp('unix')
                      }
                  }
              }
          },
          {
              method: 'DELETE', path: '/content/{id}',
              config: {
                  handler: controller.Delete,
                  validate: {
                      params: {
                          id: Joi.string().required()
                      },
                      payload: {
                          cas: Joi.string().required()
                      }
                  }
              }
          }
      ]);
      next();

    } else {
      throw ("[ExceptionError] controller in routes/content.js is undefined or null!");
    }
}

exports.register.attributes = {
    name: 'routes-content',
    version: '1.0.0'
};
