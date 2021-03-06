/* eslint-disable strict */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const logger = require('../logger');
const store = require('../store');

const BookmarksService = require('./bookmarks-service');


const bookmarksRouter = express.Router();
const bodyParser = express.json();


const serializeBookmark = bookmark => ({
  id: bookmark.id,
  title: bookmark.title,
  url: bookmark.url,
  description: bookmark.description,
  rating: Number(bookmark.rating),
});



// GET & POST BOOKMARKS
bookmarksRouter
  .route('/bookmarks')
  .get((req, res, next) => {
    BookmarksService.getAllBookmarks(req.app.get('db'))
      .then(bookmarks => {
        res.json(bookmarks.map(serializeBookmark));
      })
      .catch(next);
  })
  .post(bodyParser, (req, res) => {
  // TODO: update to use db
    for (const field of ['title', 'url', 'rating']) {
      if (!req.body[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send(`'${field}' is required`);
      }
    }
    const { title, url, description, rating } = req.body;

    if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
      logger.error(`Invalid rating '${rating}' supplied`);
      return res.status(400).send('\'rating\' must be a number between 0 and 5');
    }

    const bookmark = { id: uuid(), title, url, description, rating };

    store.bookmarks.push(bookmark);

    logger.info(`Bookmark ${bookmark.id} created`);
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${bookmark.id}`)
      .json(bookmark);
  });



  
// GET & DELETE BOOKMARKS w/ID
bookmarksRouter
  .route('/bookmarks/:bookmark_id')
  .get((req, res, next) => {
    const { bookmark_id } = req.params;
    BookmarksService.getById(req.app.get('db'), bookmark_id)
      .then(bookmark => {
        if (!bookmark) {
          logger.error(`Bookmark ${bookmark_id} not found.`);
          return res.status(404).json({
            error: { message: '404 Not Found' }
          });
        }
        res.json(serializeBookmark(bookmark));
      })
      .catch(next);
  })
  .delete((req, res) => {
    // TODO: update to use db
    const { bookmark_id } = req.params;

    const bookmarkIndex = store.bookmarks.findIndex(b => b.id === bookmark_id);

    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${bookmark_id} not found.`);
      return res
        .status(404)
        .send('404 Not Found');
    }

    store.bookmarks.splice(bookmarkIndex, 1);

    logger.info(`Bookmark ${bookmark_id} deleted.`);
    res
      .status(204)
      .end();
  });


module.exports = bookmarksRouter;