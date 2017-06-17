const mongoose = require("mongoose");

let playlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    likes: Number,
    comments: String, // currently not a reference
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }]
});

module.exports = mongoose.model("Artist", artistSchema);