const bootstrap = require('../bootstrap.js');

bootstrap();
const Artist = require('../api/models/Artist.js');
const FunkGenre = require('../api/models/FunkGenre.js');
const Song = require('../api/models/Song.js');
const Stream = require('../api/models/Stream.js');
const User = require('../api/models/User.js');

let user = new User();
user.username = "loraine";

return user.save()
    .then(user => {
        let stream = new Stream();
        stream.user = user.id;
        
        return Song.find({})
            .then(songs => {
                stream.songs.push(...songs);
                return stream.save();
            })
    })