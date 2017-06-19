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

module.exports = router;