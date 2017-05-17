/**
* BaseModel.js
* File: models/BaseModel.js
* BaseModel for any data. It is just the representation of the data and nothing else.
* @author Nate K.
*/
'use strict';

class BaseModel {
  constructor() {
    this.id = ''; // ID for look up from DB
    this.created_at = ''; // Unix timestamp
    this.updated_at = ''; // Unix timestamp
  }

  ToJSON() {
    return JSON.stringify(this);
  }

  FromJSON(jsonStr) {
    var obj = JSON.parse(jsonStr);

    for (var prop in obj) {
      if ( this.hasOwnProperty(prop) ) {
        this[prop] = obj[prop];
      }//if
    }//for
  }
}

module.exports = BaseModel;
