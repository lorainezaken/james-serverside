const passport = require('passport');
const HttpStatus = require('http-status-codes');

module.exports = (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (err, parsedJWT, info) => {
		if (err) {
			console.error(err);
			return res.json(HttpStatus.UNAUTHORIZED, { errors : [err] });
		}

		if (!parsedJWT && info instanceof jwt.JsonWebTokenError)
			return res.json(HttpStatus.UNAUTHORIZED, { errors : [info] });
		if (parsedJWT) {
			req.user = parsedJWT.user;
			req.isAuthenticated = () => true;
		}

		return next();
	});
}