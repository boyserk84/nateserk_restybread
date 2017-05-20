/**
* Content.js
* dao/content.js
* Direct Access Object for 'content'. It has a dependency injection.
*
* @author Nate K. (nkemavaha@gmail.com)
*/

'use strict';
const BaseDAO = require('./basedao');

class ContentDAO extends BaseDAO {

    constructor(model, dbAdapter) {
        // TODO: Check if model is from the certain class.
        super(model, dbAdapter);
    }
}

module.exports = ContentDAO;
