/* eslint-disable eqeqeq */
/* eslint-disable strict */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

//const { v4: uuidv4 } = require('uuid');

const validateBearerToken = require('./validateBearerToken');
const errorHandler = require('./errorHandler');
const bookmarksRouter = require('./bookmarks/bookmarksRouter');

const app = express();

// const morganOption = (NODE_ENV === 'production')
//   ? 'tiny'
//   : 'common';
//app.use(morgan(morganOption));

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}));

app.use(cors());
app.use(helmet());

// AUTH / API TOKEN VALIDATION
app.use(validateBearerToken);

// PLACE BOOKMARKS ROUTER AFTER AUTH VALIDATION
app.use(bookmarksRouter);


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// ERROR HANDLING
app.use(errorHandler);


module.exports = app;