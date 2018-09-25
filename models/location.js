'use strict';

const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;

//location detail schema
const LocationSchema = new Schema({
  name: { type: String, required: true },
  male: { type: Number, required: true },
  female: { type: Number, required: true },
  subLocations: { type : Array , "default" : [] }
});

//model
const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;