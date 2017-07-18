const router = require('express').Router();
const passport = require('passport');
const HttpStatus = require('http-status-codes');


router.post('/login',
	passport.authenticate('local'),
    (req, res) => {
        if (req.isAuthenticated())
			res.sendStatus(HttpStatus.OK);
		else
			res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	})

router.post('/register',
	passport.authenticate('local-reg'),
	(req, res) => {
		if (req.isAuthenticated())
			res.sendStatus(HttpStatus.OK);
		else
			res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	})

module.exports = router;