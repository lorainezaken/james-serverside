const router = require('express').Router();
const Genre_controller = require('./Genre.controller.js');

router.use('/', Genre_controller);

module.exports = router;