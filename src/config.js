/* eslint-disable strict */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN || 'fake-token',
  DB_URL: process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/bookmarks',
};