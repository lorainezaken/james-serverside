const mongoose = require("mongoose");

let streamSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    followers: Number
});

module.exports = mongoose.model("Stream", streamSchema);