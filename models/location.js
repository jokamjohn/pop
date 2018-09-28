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

LocationSchema.method('update', function (updates, callback) {
  const location = this;
  if (updates.updateSubLocation) Object.assign(location, { subLocations: [...this.subLocations, updates.subLocation] });
  else {
    Object.assign(location, updates)
  }
  location.save(callback);
});

//model
const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;