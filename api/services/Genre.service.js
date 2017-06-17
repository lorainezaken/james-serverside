const FunkGenre = require('../models/FunkGenre.js');

module.exports = {
    getAll() {
       return FunkGenre.find({})
        .then(genres => {
            return genres.map(genre => {
                return {
                    genreId: genre._id,
                    genreTitle: genre.genre
                }
            })
        })
    }
}