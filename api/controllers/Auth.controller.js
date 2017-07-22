const router = require('express').Router();
const passport = require('passport');
const HttpStatus = require('http-status-codes');
const UserService = require('../services/User.service.js');
const StreamService = require('../services/Stream.service.js');
const BadRequestError = require('../errors/BadRequestError.js');
const authenticate = require('../../passport/authenticate.js');
const JWTService = require('../services/JWTService.js');

router.post('/login',
    (req, res) => {
		return UserService.verifyUser(req.body)
			.then((data) => {
				let token = JWTService.createJWT({ user: data, subject: 'login', expireTime: '7d' });
				return res.json({
					token,
					data
				}).status(HttpStatus.OK).send();
			})
			.catch(err => {
				if (err.status)
					res.status(err.status).json(err).send();
				else
					res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
			})
	})

router.post('/register',
	(req, res) => {
		return UserService.register(req.body)
			.then((data) => {
				let token = JWTService.createJWT({ user: data, subject: 'login', expireTime: '7d' });
				return res.json({
					token,
					data
				}).status(HttpStatus.OK).send();
			})
			.catch(err => {
				if (err.status)
					res.status(err.status).json(err).send();
				else {
					console.error(err);
					res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
				}
			})
	})

router.post('/me',
	authenticate,
	(req, res) => {
		if (req.isAuthenticated()) {
			let user = req.user;

			return StreamService.getStream(user)
				.then(stream => {
					return res.json({
						streamId: stream.streamId,
						email: user.email,
						username: user.username,
						id: user._id,
					}).status(HttpStatus.OK).send();
				})
				.catch(err => {
					if (err.status)
						res.status(err.status).json(err).send();
					else {
						console.error(err);
						res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
					}
				})
		} else
			res.sendStatus(HttpStatus.FORBIDDEN);
	})

module.exports = router;