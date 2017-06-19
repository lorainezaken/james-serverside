const Stream = require('../models/Stream.js');
const SongService = require('./Song.service.js');

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
    }
}