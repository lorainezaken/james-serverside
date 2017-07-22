const Stream = require('../models/Stream.js');
const SongService = require('./Song.service.js');
const ArtistService = require('./Artist.service.js');
const GenreService = require('./Genre.service.js');
const Promise = require('bluebird');

module.exports = {
    createStream(user, artists) {
        return ArtistService.getSongs(artists)
            .then(songs => {
                return Stream.create({
                    user,
                    songs: songs.map(song => song.id)
                })
            })
    },

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

    // find all streams except the one of the given user
    findAll(user) {
        return Stream.find({
            user: { $ne: user }
        }).populate('songs')
            .then(streams => {
                return Promise.map(streams, stream => {
                    let artistsIds = new Set();

                    for (let song of stream.songs) {
                        artistsIds.add(song.artist);
                    }

                    return Promise.join(
                        ArtistService.getArtists([...artistsIds])
                            .then(artists => {
                                return artists.map(artist => artist.name)
                            }),
                        GenreService.getArtistsGenres([...artistsIds]),
                        (artistsNames, genres) => {
                            return {
                                streamId: stream._id,
                                followers: stream.followers,
                                artists: artistsNames,
                                genres
                            };
                        }
                    )
                });
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