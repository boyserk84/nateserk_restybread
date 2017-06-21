/**
* index.js
* This is the main Node.js application.
* @author Nate K. (nkemavaha@gmail.com)
*/

'use strict';

/** Load environment configuration */

// If it's not running Unit-Test, using a configuration from .env file.
if ( process.env.ENV != "testing ")
{
  require('dotenv').config({path: './src/config/.env'});
}

/** Load dependencies */
const Hapi = require('hapi');
const Good = require('good');
const Constants = require('./src/config/constants.js');
const GoogleDataStore = require('./src/middlewares/database/googledatastore');
//const JWTAuth = require('./src/middlewares/authentication/jwt_auth');
const Auth0 = require('./src/middlewares/authentication/auth0');

/** Load Content Route */
const ContentRoute = require('./src/routes/content.js');

// Check initialization and its dependencies
if ( typeof Hapi == 'undefined' )
{
    throw("Hapi is NULL or undefined. Abort!");
}

if ( typeof Good == 'undefined' )
{
    throw("Good is NULL or undefined. Abort!");
}

// Add routes and all plugins.
var plugins = [
    {
        register: Good,
        options:
        {
            reporters: {
                console: [
                  {
                      module: 'good-squeeze',
                      name: 'Squeeze',
                      args: [{
                          response: '*',
                          log: '*'
                      }]
                  }, {
                      module: 'good-console'
                  }, 'stdout'
                ]
            }
        }
    },
    /**
    {
        // JWT Auth strategy
        register: JWTAuth,
        options: {
          privateKey: process.env.SECRET_JWT_AUTH_KEY,
          algorithms: { algorithms: [ 'HS256' ] }
        }
    },
    **/
    /**
    {
        // Auth0 Authentication , by default enforce on all routes unless specify otherwise.
        register: Auth0
    },
    **/
    {
        // ContentRoute integrated with GoogleDataStore as a database.
        // http://localhost:8000/content
        register: ContentRoute,
        options: {
            adapter: new GoogleDataStore(
              process.env.GCLOUD_DATASTORE_PROJECT_ID,
              process.env.GCLOUD_DATASTORE_KEY_PATH,
              process.env.GCLOUD_DATASTORE_KIND_CONTENT
            )
        }
    }
];

// Create a server with a host and port
const server = new Hapi.Server(
  {
    debug: {
      request: ['info','error']
    }
  }
);

server.connection({
    host: 'localhost',
    port: 8000,
    routes: {
      /**
      * This is required for support modern browser CORS mechanism.
      * see https://en.wikipedia.org/wiki/Cross-origin_resource_sharing for more info.
      */
      cors: {
          origin: ['*'],
          credentials: true,
          headers: ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]  // This must match request headers.
      }
    }
});


server.register(plugins, function (err) {
    if (err) { throw err; }

    if (!module.parent) {
        // server instance starts here
        server.start(function(err)
        {
            if (err) { throw err; }

            // Example endpoint - you can remove this
            server.route([
                {
                    method: 'GET',
                    path: '/example',
                    config: {
                      auth: false,
                      handler:
                        function(request, reply)
                        {
                          reply( { text: 'Here is the sample response!' } );
                        }
                    }

                },
                /////////////////////////////////////////////////////////////
                // This is the example endpoint with Authentication
                // - You will need uncomment out one of Authentication strategies in order to enable one of these endpoints.
                ////////////////////////////////////////////////////////////
                // Example of restricted endpoint using JWT authentication
                /**
                {
                    method: 'GET',
                    path: '/restricted',
                    config: {
                      handler:
                        function (request, reply)
                        {
                          reply( { text: 'You have used your JwT token!' } );
                        }
                    }
                },
                **/
                // Example of restricted endpoint with Auth0 Authentication integrated with Auth0's Scope
                /**
                {
                    method: 'GET',
                    path: '/privatescope',
                    config: {
                       auth: {
                         scope: 'openid read:content write:content',
                      },
                      handler:
                        function (request, reply)
                        {
                          reply( { text: 'You have used your token with the correct scope!' } );
                        }
                    }
                }
                **/
              ]
            );

            server.log('info', 'Server running at: ' + server.info.uri);
        });
    }
});

module.exports = server;
