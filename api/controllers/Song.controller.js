const router = require('express').Router();
const SongService = require('../services/Song.service.js');
const HttpStatus = require('http-status-codes');

router.get('/songs',
    (req, res) => {
        return SongService.getAll()
            .then(songs => {
                res.status(HttpStatus.OK).json({
                    songs
                })
            })
            .catch(err => {
                console.error(err);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    });

module.exports = router;