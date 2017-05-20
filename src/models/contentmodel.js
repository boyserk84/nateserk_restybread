/**
* ContentModel.js
* File: models/ContentModel.js
* Data class for representing 'Content'
* @author Nate K.
*/
'use strict';
const BaseModel = require('./baseModel');

class ContentModel extends BaseModel {

   constructor() {
    super();
    this.title = "";
    this.desc = "";
    this.published_at = ""; //time stamp of when the content is published.
    this.locations = [];  // Array of publication locations
    this.records = [];  // Array of records associated with content
  }
}

module.exports = ContentModel;
