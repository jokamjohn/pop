'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('morgan');
require('./models/db').Database;
const cors = require('./middlewares/cors');
const router = require('./controllers/index');
const errorHandler = require('./middlewares/errorHandler');

//app port
const port = process.env.PORT || 5000;

//setting app secret
app.set('secret', process.env.SECRET || 'dfbhsjlbvndskzbvcnjsdkc');

//Body parser
app.use(express.json());

//app middleware
app.use(logger('dev'));
app.use(cors.CORS);

//app routing
app.use('/api/v1', router);

//app error middleware
app.use(errorHandler.catch404);
app.use(errorHandler);


//start server
const server = app.listen(port, () => console.log(`app pop running on port ${port}`));

module.exports = server;

