const Artist = require('../models/Artist.js');
const SongService = require('./Song.service.js');

module.exports = {
    getArtists(ids = []) {
        return Artist.find({
            _id: {
                $in: ids
            }
        });
    },
    getSongs(artistIds = []) {
        return this.getArtists(artistIds)
            .populate('songs')
            .then(artists => {
                let songs = [];

                for (let artist of artists) {
                    songs.push(...artist.songs.map(song => {
                        song.artist = { name: artist.name };
                        return SongService.convertToApiFormat(song);
                    }));
                }
                
                return songs;
            })
    }
}