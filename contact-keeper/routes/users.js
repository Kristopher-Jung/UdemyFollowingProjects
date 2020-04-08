const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// USER REGISTRATION
// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
	"/",
	[
		//validationResult/express-validator: validating post request body
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body; // get required info from request body.

		try {
			let user = await User.findOne({ email }); // query mongoDB with given email.
			if (user) {
				// user already exists (doesn't need to register.
				return res.status(400).json({ msg: "User already exists" });
			}

			user = new User({
				//create a new user model with given request body information.
				name,
				email,
				password,
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt); //encrypt password
			await user.save(); //save the user model to mongoDB

			const payload = {
				//JWT payload.
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 3600, //token options: expired in 3600 sec
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token }); // response the user_id token back to browser.
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
