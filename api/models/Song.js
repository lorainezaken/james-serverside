const mongoose = require("mongoose");

let songSchema = new mongoose.Schema({
    name: String,
    playingTime: Number,
    songFileUrl: String,
    albumCoverUrl: String,
    artist: { type: mongoose.Types.ObjectId, ref: "Artist" }
});

module.exports = mongoose.model(songSchema, "Song");