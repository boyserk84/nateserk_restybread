/**
* baseauthentication.js
*
* Base Authentication Plug-in. Any auth strategy can be derived from.
* It acts as an interface.
*
* @author Nate K. (nkemavaha@gmail.com)
*/

'use strict';

class BaseAuthentication {
    Validate( decoded, request, callback ) {
        throw("Derived class must implement 'Validate' method!");
        return false;
    }
}

module.exports = BaseAuthentication;
