/**
* BaseModel.js
* File: models/BaseModel.js
* BaseModel for any data. It is just the representation of the data and nothing else.
* @author Nate K.
*/
'use strict';

function BaseModel() {
  this.id = ''; // ID for look up from DB
  this.created_at = ''; // Unix timestamp
  this.updated_at = ''; // Unix timestamp
};

/**
* Helper method to get all contents
*/
BaseModel.prototype.get = function() {
};

/**
* Serialize this object.
*/
BaseModel.prototype.ToJSON = function() {
  return JSON.stringify(this);
};

/**
* Deserialize to this object.
* @param json     JSON string
*/
BaseModel.prototype.FromJSON = function(jsonStr) {
  var obj = JSON.parse(jsonStr);

  for (var prop in obj) {
    if ( this.hasOwnProperty(prop) ) {
      this[prop] = obj[prop];
    }//if
  }//for
};


module.exports = BaseModel;
