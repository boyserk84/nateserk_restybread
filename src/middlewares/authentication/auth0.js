/**
* auth0.js
* Auth0 Middlewware Authentication Strategy.
* See https://auth0.com/docs/quickstart/backend/hapi/01-authorization for more info.
* Based on: https://github.com/auth0-samples/auth0-hapi-api-samples/blob/master/01-Authenticate-RS256/server.js.
* @author Nate K. (nkemavaha@gmail.com)
*/

'use strict';

const BaseAuthentication = require('./baseauthentication');
const jwksRsa = require('jwks-rsa');

class Auth0 extends BaseAuthentication {

  Validate( decoded, request, callback ) {
    // This is a simple check that the `sub` claim
    // exists in the access token. Modify it to suit
    // the needs of your application
    console.log("Validate is called for Auth0!");
    // TODO: Implement this to suit your application
    // i.e. check if token is blacklisted or revoked.

    console.log( decoded );
    if (decoded && decoded.sub) {
      return callback(null, true);
    }

    return callback(null, false);
  }
};


/**
* Register Authentication Strategy to a server instance.
*/
exports.register = function (server, options, next) {
    server.register(require('hapi-auth-jwt2'), (err) => {
        if ( err ) {
          // TODO: Error log
          console.log( err );
          throw( err );
          return;
        }

        // Auth0 is using RSA256 algorithm by default.
        server.auth.strategy('jwt', 'jwt', process.env.DEFAULT_AUTH_MODE,
        {
            complete: true,
            // verify the access token against the
            // remote Auth0 JWKS
            key: jwksRsa.hapiJwt2Key({
              cache: true,
              rateLimit: true,
              jwksRequestsPerMinute: 5,
              jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
            }),
            verifyOptions: {
              audience: process.env.AUTH0_AUDIENCE,
              issuer: `https://${process.env.AUTH0_DOMAIN}/`,
              algorithms: ['RS256']
            },
            validateFunc: new Auth0().Validate
          });
    });

    next();
};

exports.register.attributes = {
    name: 'auth0',
    version: '1.0.0'
};
