const bootstrap = require('./bootstrap.js');
const express = require('express');
const controllers = require('./api/controllers/index.js');

let app = express();
const port = process.env.PORT || 8080;

bootstrap();
const Artist = require('./api/models/Artist.js');
const FunkGenre = require('./api/models/FunkGenre.js');
const Song = require('./api/models/Song.js');
const Promise = require('bluebird');

app.use(controllers);
app.listen(port, () => {

    Artist.find({})
        .then(artists => {
            let i = 0;

            for(let artist of artists) {
                let song = new Song();
                song.name = i++;

                song.save()
                    .then(sng => {
                        artist.songs.push(sng);
                        artist.save();
                    })
            }
        })
    // FunkGenre.find({})
    //     .then(genres => {
    //         let artist = new Artist();
            
    //         artist.name = "lildicky";
    //         artist.save()
    //             .then(artist => {
    //                 Promise.map(genres, (genre => {
    //                     genre.artists.push(artist);
    //                     return genre.save();
    //                 }))
    //             })
    //     })

    console.log("james-server is up and runing");
})