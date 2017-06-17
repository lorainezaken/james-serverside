const bootstrap = require('./bootstrap.js');
const express = require('express');

let app = express();

bootstrap();

app.listen(3000, () => {
    console.log("james-server is up and runing");
})