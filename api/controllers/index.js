const router = require('express').Router();
const Genre_controller = require('./Genre.controller.js');
const Artist_controller = require('./Artist.controller.js');
const Stream_controller = require('./Stream.controller.js');
const Song_controller = require('./Song.controller.js');

router.use('/', Genre_controller);
router.use('/', Artist_controller);
router.use('/', Stream_controller);
router.use('/', Song_controller);

module.exports = router;