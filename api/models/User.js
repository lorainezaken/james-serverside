const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let userSchema = new mongoose.Schema({
    email: String,
    profilePictureUrl: String,
    username: String,
    password: { type: String, minLength: 6 },
    followingStreams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stream" }]
});

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model("User", userSchema);