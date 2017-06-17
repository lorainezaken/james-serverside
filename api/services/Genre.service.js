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
    getGenresCommonArtists(genereIds) {
        return FunkGenre.find({
            _id: {
                $in: genereIds
            }
        }).then(genres => {
            if (genres.length === 0)
                throw Error('no such genres');

            let commonArtists = genres[0].artists;

            for (let genre of genres) {
               commonArtists = commonArtists.filter(artist => genre.artists.map(objId => objId.toString()).includes(artist.toString())) 
            }

            return Artist_service.getArtists(commonArtists);
        })
        .then(artists => {
            return artists.map(artist => {
                return {
                    artistName: artist.name
                }
            });
        });
    }
}