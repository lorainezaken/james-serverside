const Stream = require('../models/Stream.js');
const User = require('../models/User.js');
const SongService = require('./Song.service.js');
const ArtistService = require('./Artist.service.js');
const GenreService = require('./Genre.service.js');
const BadRequestError = require('../errors/BadRequestError.js');
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

    followStream({ userId, streamId }) {
        return Promise.join(User.findById(userId),
            Stream.findById(streamId),
            (user, stream) => {
                if(!stream)
                    throw new BadRequestError('stream doesn\'t exist');
                
                if (user.followingStreams.filter(stream => stream.toString() === streamId ).length > 0)
                    throw new BadRequestError('allready following this stream');

                if (stream.followers === undefined)
                    stream.followers = 0;
                stream.followers++;

                user.followingStreams.push(stream);
                
                return Promise.all([stream.save(), user.save()]);
            })
    },

    // find all streams except the one of the given user
    findAll(user) {
        return Stream.find({
            user: { $ne: user }
        }).populate('songs')
            .populate('user')
            .then(streams => {
                return this.formatStreams(streams, user);
            })
    },

    findFollowedStreams(userId) {
        return User.findById(userId)
            .then(user => {
                if (!user)
                    throw new BadRequestError('no such user');

                return Stream.find({
                    _id: { $in: user.followingStreams}
                }).populate('songs').populate('user')
                    .then(streams => {
                        return this.formatStreams(streams, user);
                    })
            })
    },

    formatStreams(streams, user) {
        return Promise.map(streams, stream => {
            let artistsIds = new Set();
            let albumCover;

            for (let song of stream.songs) {
                if (song.albumCoverUrl)
                    albumCover = song.albumCoverUrl;
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
                        streamPicUrl: albumCover,
                        followers: stream.followers,
                        trailer: stream.songs[0].songFileUrl,
                        isFollowing: user.followingStreams.filter(followed => followed.toString() === stream._id.toString()).length > 0,
                        artists: artistsNames,
                        username: (stream.user || {}).username,
	                    userProfilePic: (stream.user || {}).profilePictureUrl,
                        genres
                    };
                }
            )
        });
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