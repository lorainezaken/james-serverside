const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

module.exports = {
	register(username, email, password, profilePic) {
		return User.findOne({
				email
			})
			.then(user => {
				if (user)
					throw new Error('user allready exists');
				return User.create({
					username,
					email,
					password,
					profilePic
				})
			})
	}
}