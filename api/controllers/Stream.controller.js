const router = require('express').Router();
const StreamService = require('../services/Stream.service.js');
const HttpStatus = require('http-status-codes');
const authenticate = require('../../passport/authenticate.js');

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

router.post('/followStream',
    authenticate,
    (req, res) => {
        if (req.isAuthenticated()) {
            let body = req.body;
            body.userId = req.user.id;
            return StreamService.followStream(body)
                .then(() => {
                    return res.sendStatus(HttpStatus.OK);
                })
                .catch(err => {
					if (err.status)
						res.status(err.status).json(err).send();
					else {
						console.error(err);
						res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
					}
				})
        } else
			return res.sendStatus(HttpStatus.FORBIDDEN);
    });

router.get('/followedStreams',
    authenticate,
    (req, res) => {
        if (req.isAuthenticated()) {
            return StreamService.findFollowedStreams(req.user.id)
                .then(streams => {
                    return res.status(HttpStatus.OK).json(streams)
                })
                .catch(err => {
					if (err.status)
						res.status(err.status).json(err).send();
					else {
						console.error(err);
						res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
					}
				})
        } else
			return res.sendStatus(HttpStatus.FORBIDDEN);
    });

router.get('/streams',
    authenticate,
    (req, res) => {
        if (req.isAuthenticated())
            return StreamService.findAll(req.user)
                .then(streams => {
                    return res.status(HttpStatus.OK).json(streams)
                })
                .catch(err => {
					if (err.status)
						res.status(err.status).json(err).send();
					else {
						console.error(err);
						res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
					}
				})
        else
			return res.sendStatus(HttpStatus.FORBIDDEN);
    });

module.exports = router;