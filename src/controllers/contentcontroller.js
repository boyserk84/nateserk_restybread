/**
* ContentController.js
* File: controllers/ContentController.js
* Controller or manager for handling request, fetch and process data and reply back the response.
* @author Nate K.
*/
'use strict';

//var Boom = require('boom');
const BaseCRUDController = require('./basecrudcontroller');
const ContentModel = require('../models/contentmodel');
const ContentDAO = require('../dao/content');
const GoogleDataStore = require('../middlewares/googledatastore');
const aguid = require('aguid');


class ContentController extends BaseCRUDController{
    constructor(dbAdapter) {
      super();
      this._dbAdapter = dbAdapter;
    }

    _GetById(id, callback) {
      // TODO: integrate with BOOM
      console.log("Trying to retrieve Id=" + id);

      let model = new ContentModel();
      let dao = new ContentDAO( model, this._dbAdapter);

      model.id = id;
      dao.Get(
        function(result) {
          if ( result ) {
            callback( { data: result } );
          } else {
            callback( { data: [] });
          }
        }
      );

    }

    _Create(params, callback) {
      let model = new ContentModel();
      let dao = new ContentDAO(model, this._dbAdapter);

      // TODO: Integrate params
      model.id = aguid( Date.now() );
      model.title = Date.now();

      dao.Create(
        function(result) {
          console.log(result);
          let codeStatus = 500;
          if ( result ) {
            codeStatus = 202;
          }

          if ( callback ) {
            callback( { code: codeStatus });
          }
        }
      );

    }

    _Delete(id) {
      // TODO: Implement this
      return { code: 204 };
    }

    _Update(id, params) {
      // TODO: Implement this
      return { code: 200 };
    }
}

module.exports = ContentController;
