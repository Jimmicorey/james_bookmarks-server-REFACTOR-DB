/* eslint-disable strict */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const { API_TOKEN } = require('./config');
const logger = require('./logger');

function validateBearerToken(req, res, next) {

  const authToken = req.get('Authorization');

  logger.error(`Unauthorized request to path: ${req.path}`);

  if (!authToken || authToken.split(' ')[1] !== API_TOKEN) {

    return res.status(401).json({ error: 'You shall not pass!!!' });
    
  }

  next();
}

module.exports = validateBearerToken;