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
    }
];

// Create a server with a host and port
const server = new Hapi.Server(
  {
    debug: {
      request: ['info', 'error']
    }
  }
);

server.connection({
    host: 'localhost',
    port: 8000
});


server.register(plugins, function (err) {
    if (err) { throw err; }

    if (!module.parent) {
        // server instance starts here
        server.start(function(err)
        {
            if (err) { throw err; }

            // example
            server.route([
                {
                    method: 'GET',
                    path: '/example',
                    handler:
                        function(request, reply)
                        {
                            reply({text: 'Here is the sample response!'});
                        }

                }]
            );

            server.log('info', 'Server running at: ' + server.info.uri);
        });
    }
});

module.exports = server;
