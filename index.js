const bootstrap = require('./bootstrap.js');
const express = require('express');
const controllers = require('./api/controllers/index.js');
const config = require('./config/passport.js');
const passport = require('passport');
const bodyparser = require('body-parser');
const cors = require('cors');

let app = express();
const port = process.env.PORT || 8080;

bootstrap();

config(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyparser.json());
app.use(cors({
    optionsSuccessStatus:200
}))
app.use(controllers);
app.listen(port, () => {
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