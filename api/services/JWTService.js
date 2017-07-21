"use strict";
const jwt = require('jsonwebtoken'),
	  Promise = require('bluebird');

/**
 * JWT Service - handle creation/validation of Json Web Tokens
 */
module.exports = {
	createJWT: function({user, userId, jwtid, expireTime, subject}) {
		let id = user ? user.id : userId;
		let payload = {};
		
		if (id)
			payload.user = id;

		let options = {
			expiresIn: expireTime,
			subject: subject,
			jwtid: jwtid
		};

		let token = jwt.sign(payload, 'secret', options);
		return token;
	},

	verifyJWT: function({token, subject}) {
		return Promise.try(() => {
			let payload = jwt.verify(token, 'secret', { subject: subject });

			return payload;
		})
	}
}