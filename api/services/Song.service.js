const Song = require('../models/Song.js');

module.exports = {
    convertToApiFormat(song) {
        return {
            name: song.name,
            playingTime: song.playingTime,
            songFileUrl: song.songFileUrl,
            albumCoverUrl: song.albumCoverUrl,
            artistName: song.artist ? song.artist.name : undefined
        }
    },

    findSongs(songIds = []) {
        return Song.find({
            _id: { 
                $in: songIds
            }
        })
    }
}