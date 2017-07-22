const User = require('../api/models/User.js');
const JWTService = require('../api/services/JWTService.js');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Promise = require('bluebird')
const moment = require('moment');

module.exports = function(passport) {

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	/**
	 * @desc use passports 'JWT' strategy
	 */
	let opts = {
		jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeader(), ExtractJwt.fromUrlQueryParameter("access_token")]),
		secretOrKey: 'secret'
	};
	passport.use(new JwtStrategy(opts, function(jwtPayload, done) {

		// Validate user
		return Promise.try(() => {
			if (jwtPayload.sub !== 'login')
				throw new Error('Token subject is incorrect');
		})
			.then(() => User.findById(jwtPayload.user))
			.then(user => {
				if (!user)
					throw new Error('Token didn\'t contain a valid user');
				return user;
			})
			.then(user => {
				return done(null, { user });
			})
			.catch((err) => {
				console.warn('failed to authenticate jwt', err);
				return done(new Error('Failed to authenticate user'));
			});
	}));
};