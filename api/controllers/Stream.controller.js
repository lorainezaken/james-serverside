const router = require('express').Router();
const StreamService = require('../services/Stream.service.js');
const HttpStatus = require('http-status-codes');

router.get('/stream',
    (req, res) => {
        let userId = req.param("userId");

        if (userId === undefined)
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "you must provide userId as a parameter"
            })

        return StreamService.getStream(userId)
            .then(stream => {
                return res.status(HttpStatus.OK).json({
                    stream
                })
            })
            .catch(err => {
                console.error(err);
                res.status(HttpStatus.BAD_REQUEST);
            })
    })

router.post('/stream/:streamId/songs',
    (req, res) => {
        let streamId = req.params.streamId;
        let songIds = req.query.songIds;

        if (songIds === undefined)
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "you must provide songIds as a parameter"
            })
        songIds = songIds.split(',');

        return StreamService.addSongsToStream(streamId, songIds)
            .then(() => {
                return res.status(HttpStatus.OK).send();
            })
            .catch(err => {
                console.error(err);
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: err.message
                }).send();
            })
    })

module.exports = router;