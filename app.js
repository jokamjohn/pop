'use strict';

require('dotenv').config();
const express = require('express');
express.json();
const app = express();
const logger = require('morgan');
const cors = require('./middlewares/cors');

//app port
const port = process.env.PORT || 5000;

//setting app secret
app.set('secret', process.env.SECRET || 'dfbhsjlbvndskzbvcnjsdkc');

//app middleware
app.use(logger('dev'));
app.use(cors.CORS);


//start server
app.listen(port, () => console.log(`app pop running on port ${port}`));

