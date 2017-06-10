/**
* jwt_auth.js
* JWT (JSON Web Token) Authentication Strategy.
*
* This contains authentication strategy related to JSON Web Token.
* @author Nate K. (nkemavaha@gmail.com)
*/

'use strict';

const BaseAuthentication = require('./baseauthentication');

class JWTAuth extends BaseAuthentication {

  Validate( decoded, request, callback ) {
      throw("Implementation needed!");
  }
};

/**
* Register Authentication Strategy to a server instance.
*/
exports.register = function (server, options, next) {
    server.auth.strategy('jwt', 'jwt',
      {
        key: options.privateKey,                        // Never Share your secret key
        validateFunc: new JWTAuth().Validate,                 // validate function
        verifyOptions: options.algorithm                // JWT specific: Pick algorithm to decode key
      }
    );

    server.auth.default(process.env.AUTH_STRATEGY);

    next();
};

exports.register.attributes = {
    name: 'jwt_auth',
    version: '1.0.0'
};
