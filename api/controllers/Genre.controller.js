const router = require('express').Router();
const GenreService = require('../services/Genre.service.js');

router.get('/funkGenres',
    (req, res) => {
        return GenreService.getAll()
            .then(genres => {
                res.status(200).json({
                    genres
                })
            })
            .catch(err => {
                console.error(err);
                res.status(500);
            })
    });

module.exports = router;