const bootstrap = require('../bootstrap.js');

bootstrap();
const Artist = require('../api/models/Artist.js');
const FunkGenre = require('../api/models/FunkGenre.js');
const Song = require('../api/models/Song.js');
const Stream = require('../api/models/Stream.js');
const User = require('../api/models/User.js');

return Artist.findOne({})
    .then(artist => {
        let song = new Song();
        song.artist = artist;
        song.name = "oops baby one more time";
        playingTime = 123123;
        songFileUrl = "blabla.mp3";
        albumCoverUrl = "blabla.jpeg";

        return song.save();
    })