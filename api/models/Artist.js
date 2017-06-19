const mongoose = require("mongoose");
const Song = require('./Song.js');

let artistSchema = new mongoose.Schema({
    name: String,
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }]
});

module.exports = mongoose.model("Artist", artistSchema);