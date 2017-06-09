/**
* BaseModel.js
* File: models/BaseModel.js
* BaseModel for any data. It is just the representation of the data and nothing else.
* The goal is to mapping attributes/data from DAO object. There is no direct interaction with DB.
* @author Nate K.
*/
'use strict';
const Moment = require('moment');
const Aguid = require('aguid');

class BaseModel {
  constructor() {
    this.id = Aguid(); // ID for look up from DB
    this.created_at = Moment().unix(); // Unix timestamp
    this.updated_at = ''; // Unix timestamp
    this.cas = this.GenerateCAS(); // CAS value
    this.ownerId = '';  // OwnerId
  }

  /**
  * Generate CAS value (Check and Set)
  * Reference: https://stackoverflow.com/questions/22601503/what-is-cas-in-nosql-and-how-to-use-it
  */
  GenerateCAS() {
    return Aguid( this.id + "_" + Moment().unix() );
  }

  /** The given type of the model (i.e. className). */
  GetType() {
    throw("Child Class must implement 'GetType' method.");
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
    this.FromObject(obj)
  }

  /**
  * Helper method to parse the given object to this class.
  * @param obj        Object
  */
  FromObject(obj) {
    for (var prop in obj) {
      if ( this.hasOwnProperty(prop) ) {
        this[prop] = obj[prop];
      }//if
    }//for
  }

  /**
  * Helper method to determine if the given property is READ-ONLY.
  * Therefore, it cannot be updated during the merge.
  * @param prop         Name of the property
  */
  IsPropertyReadOnly(prop) {
    return ("created_at, id").indexOf(prop) < 0;  // check if prop is NOT in the blacklist.
  }

  /**
  * Helper method to merge data from the given object, ignoring empty fields.
  * @param obj        Object
  */
  MergeDataFromObject(obj) {
    for (var prop in obj) {
      if ( this.hasOwnProperty(prop) && obj[prop] && this.IsPropertyReadOnly(prop) ) {
        this[prop] = obj[prop];
      }//if
    }//for
  }
}

module.exports = BaseModel;
