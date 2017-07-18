// load all the things we need
const LocalStrategy   = require('passport-local').Strategy;
const UserService = require('../api/services/User.service.js');

// load up the user model
const User = require('../api/models/User.js');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
	});
	
	passport.use('local', new LocalStrategy({
		usernameField: 'email',
    	passwordField: 'pass',
	}, function(email, password, done) {
		User.findOne({ email }, function (err, user) {
			if (err)
				return done(err);

			if (!user)
				return done(null, false);

			if (!user.verifyPassword(password)) 
				return done(null, false);
			
			return done(null, user);
		});
	}));

	passport.use('local-reg', new LocalStrategy({
		usernameField: 'email',
    	passwordField: 'pass',
		passReqToCallback : true
	}, 
	(req, email, password, done) => {
		let username = req.param("username");
		let profilePic = req.param("profilePic");

		if (!username || !email || !password)
			return done(new Error("must send all required fields"));
		
		return UserService.register(username, email, password, profilePic)
			.then(user => {
				return done(null, user);
			})
			.catch(err => {
				return done(new Error("general error with registering user"));
			})
	}));
};
