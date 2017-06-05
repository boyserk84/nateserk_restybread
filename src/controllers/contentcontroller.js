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
      model.FromObject(params);
      let dao = new ContentDAO(model, this._dbAdapter);

      dao.Create(
        function(result) {
          console.log(result);
          let codeStatus = 500;
          if ( result ) {
            codeStatus = 201; // Content created
          }

          if ( callback ) {
            callback( { code: codeStatus });
          }
        }
      );

    }

    _Delete(id, cas, callback) {
      let model = new ContentModel();
      model.id = id;
      model.cas = cas;
      let dao = new ContentDAO(model, this._dbAdapter);

      dao.Delete(
        function (result) {
          console.log(result);
          let codeStatus = 202; // Accepted, but no doing anything
          if ( result ) {
            codeStatus = 200; // OK, delete success
          }

          if ( callback ) {
            callback( { code: codeStatus });
          }

        }
      );
    }

    _Update(id, data, callback) {
      let model = new ContentModel();
      model.id= id;
      model.FromObject( data );
      let dao = new ContentDAO(model, this._dbAdapter);

      dao.Update(
        function(result) {
          let codeStatus = 500;

          if ( result ) {
            codeStatus = 200; // OK
          }

          if ( callback ) {
            callback( { code: codeStatus } );
          }

        }
      );
    }
}

module.exports = ContentController;
