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
        if (model && model.GetType() === "ContentModel") {
          super(model, dbAdapter);
        } else {
          console.log("Exception model is undefined in ContentDAO.");
          throw("Exception: 'model' is undefined or has incorrect classType.");
        }
    }
}

module.exports = ContentDAO;
