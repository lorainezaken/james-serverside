const router = require('express').Router();
const passport = require('passport');
const HttpStatus = require('http-status-codes');
const UserService = require('../services/User.service.js');
const BadRequestError = require('../errors/BadRequestError.js');
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

module.exports = router;