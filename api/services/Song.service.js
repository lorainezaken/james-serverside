const Song = require('../models/Song.js');

module.exports = {
    convertToApiFormat(song) {
        return {
            id: song._id,
            name: song.name,
            playingTime: song.playingTime,
            songFileUrl: song.songFileUrl,
            albumCoverUrl: song.albumCoverUrl,
            artistName: song.artist ? song.artist.name : undefined
        }
    },

    getAll() {
        return Song.find({})
            .then(songs => songs.map(this.convertToApiFormat))
    },

    findSongs(songIds = []) {
        return Song.find({
            _id: { 
                $in: songIds
            }
        })
    }
}