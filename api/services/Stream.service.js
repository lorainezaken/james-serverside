const Stream = require('../models/Stream.js');
const SongService = require('./Song.service.js');
const Promise = require('bluebird');

module.exports = {
    getStream(userId) {
        return Stream.findOne({
            user: userId
        }).populate('songs')
            .then(stream => {
            if (!stream)
                throw new Error("no stream for user..");
            
            return {
                streamId: stream.id,
                songs: stream.songs.map(song => {
                    return SongService.convertToApiFormat(song);
                })
            }
        })
    },

    addSongsToStream(streamId, songIds) {
        return Promise.join(
            Stream.findById(streamId),
            SongService.findSongs(songIds),
            (stream, songsToAdd) => {
                if (!stream)
                    throw new Error("no such stream");
                let songsIds = songsToAdd.map(song => song.id.toString());
                
                for (let song of stream.songs) {
                    if (songsIds.includes(song.toString()))
                        return;
                }

                stream.songs.push(...songsToAdd);
                return stream.save();
            }
        )
    }
}