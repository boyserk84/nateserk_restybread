/**
* BaseModel.js
* File: models/BaseModel.js
* BaseModel for any data. It is just the representation of the data and nothing else.
* The goal is to mapping attributes/data from DAO object. There is no direct interaction with DB.
* @author Nate K.
*/
'use strict';

class BaseModel {
  constructor() {
    this.id = ''; // ID for look up from DB
    this.created_at = ''; // Unix timestamp
    this.updated_at = ''; // Unix timestamp
    this.cas = ''; // CAS value
  }

  /** Serialize this object to JSON string. */
  ToJSON() {
    return JSON.stringify(this);
  }

  /**
  * Deserialize JSON string to this object.
  * @param jsonStr      String in JSON format
  */
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
