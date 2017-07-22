const passport = require('passport');
const HttpStatus = require('http-status-codes');

module.exports = (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (err, parsedJWT, info) => {
		if (err) {
			console.error(err);
			return res.status(HttpStatus.UNAUTHORIZED).json(err);
		}

		if (!parsedJWT && info instanceof jwt.JsonWebTokenError)
			return res.status(HttpStatus.UNAUTHORIZED).json(info);
		if (parsedJWT) {
			req.user = parsedJWT.user;
			req.isAuthenticated = () => true;
		}

		return next();
	})(req, res, next);;
}