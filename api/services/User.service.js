const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const BadRequestError = require('../errors/BadRequestError.js');
const UnauthorizedError = require('../errors/UnauthorizedError.js');

module.exports = {
	verifyUser({ email, password }) {
		if (email === undefined || password === undefined) {
			return Promise.reject(new BadRequestError('not all data supplied'));
		}
		return User.findOne({
			email
		}).then(user => {
			if (!user)
				throw new BadRequestError('user doesn\'t exist');
			if (!user.verifyPassword(password))
				throw new UnauthorizedError('credentials dont match');

			return user;
		})
	},
	register({ username, email, password, artists, profilePic }) {
		if (username === undefined || email === undefined || password === undefined || artists === undefined) {
			return Promise.reject(new BadRequestError('not all data supplied'));
		}
		return User.findOne({
			email
		})
		.then(user => {
			if (user)
				throw new BadRequestError('user allready exists');
			return User.create({
				username,
				email,
				password,
				profilePic
			})
		})
	}
}