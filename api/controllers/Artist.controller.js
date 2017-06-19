const router = require('express').Router();
const Artist_service = require('../services/Artist.service.js');
const HttpStatus = require('http-status-codes');

router.get('/artistsSongs',
    (req, res) => {
        let artistIds = req.param("artistIds");

        if (artistIds === undefined)
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "you must provide artistIds as a parameter"
            })
        artistIds = artistIds.split(',');

        return Artist_service.getSongs(artistIds)
            .then(songs => {
                return res.status(HttpStatus.OK).json({
                    songs
                })
            })
            .catch(err => {
                console.error(err);
                res.status(HttpStatus.BAD_REQUEST);
            })
    })

module.exports = router;