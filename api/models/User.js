const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    email: String,
    profilePictureUrl: String,
    username: String,
    password: { type: String, minLength: 6 }
});

module.exports = mongoose.model("User", userSchema);