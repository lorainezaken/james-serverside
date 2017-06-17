const router = require('express').Router();
const GenreService = require('../services/Genre.service.js');
const HttpStatus = require('http-status-codes');

router.get('/funkGenres',
    (req, res) => {
        return GenreService.getAll()
            .then(genres => {
                res.status(HttpStatus.OK).json({
                    genres
                })
            })
            .catch(err => {
                console.error(err);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    });

router.get('/funkGenresArtists',
    (req, res) => {
        let genreIds = req.param("genreIds");

        if (genreIds === undefined)
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "you must provide genreIds as a parameter"
            })
        genreIds = genreIds.split(',');

        return GenreService.getGenresCommonArtists(genreIds)
            .then(artists => {
                return res.status(HttpStatus.OK).json({
                    artists
                })
            })
            .catch(err => {
                console.error(err);
                res.status(HttpStatus.BAD_REQUEST);
            })
    })

module.exports = router;