const bootstrap = require('./bootstrap.js');
const express = require('express');

let app = express();
const port = process.env.PORT || 8080;

bootstrap();

app.listen(port, () => {
    console.log("james-server is up and runing");
})