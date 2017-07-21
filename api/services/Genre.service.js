const FunkGenre = require('../models/FunkGenre.js');
const Artist_service = require('./Artist.service.js');

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
    },
    getGenresArtists(genereIds) {
        return FunkGenre.find({
            _id: {
                $in: genereIds
            }
        }).then(genres => {
            if (genres.length === 0)
                throw Error('no such genres');

            let artists = new Set();

            for (let genre of genres) {
                for (let artistId of genre.artists)
                    artists.add(artistId);
            }

            return Artist_service.getArtists([...artists]);
        })
        .then(artists => {
            return artists.map(artist => {
                return {
                    artistId: artist._id,
                    artistName: artist.name
                }
            });
        });
    }
}