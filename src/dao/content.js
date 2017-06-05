/**
* Content.js
* dao/content.js
* Direct Access Object for 'content'. It has a dependency injection.
*
* @author Nate K. (nkemavaha@gmail.com)
*/

'use strict';
const BaseDAO = require('./basedao');
const ContentModel = require('../models/contentmodel');

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

    _MergeData(remoteData, model) {
        let remoteModel = new ContentModel();
        remoteModel.FromObject( remoteData ); // remote data
        remoteModel.MergeDataFromObject( model ); // update with the model we have
        return remoteModel;
    }
}

module.exports = ContentDAO;
