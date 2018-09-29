'use strict';

const mongoose = require('mongoose');

//connect the database
mongoose.connect(process.env.DATABASE_URL);

//db object
const db = mongoose.connection;

//error event listener
db.on('error', error => console.error("db connection error ", error));

//connection open event listener
db.once('open', () => console.log("Db connection successful", process.env.DATABASE_URL));

module.exports.Database = db;