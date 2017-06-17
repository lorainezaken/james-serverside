const mongoose = require("mongoose");

let genreSchema = new mongoose.Schema({
    genre: String,
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }]
});

module.exports = mongoose.model("FunkGenre", genreSchema);