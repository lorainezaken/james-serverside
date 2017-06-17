const bootstrap = require('./bootstrap.js');
const express = require('express');
const controllers = require('./api/controllers/index.js');

let app = express();
const port = process.env.PORT || 8080;

bootstrap();
const FunkGenre = require('./api/models/FunkGenre.js');

app.use(controllers);
app.listen(port, () => {
    let genre = new FunkGenre();

    genre.genre = "soul";
    genre.save();
    console.log("james-server is up and runing");
})