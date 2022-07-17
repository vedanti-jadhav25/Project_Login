const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports.register = (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    const newUser = new User({ username: username, email: email, password: password });
    const saltRounds = 10;
    User.findOne({ email })
        .then(user => {
            if (password) {
                if (user) {
                    res.status(400).send("User already exists.", user);
                } else {
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(password, salt, function (err, hash) {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    jwt.sign(
                                        { id: user._id },
                                        config.get('jwtsecret'),
                                        { expiresIn: 3600 },
                                        (err, token) => {
                                            if (err) throw err;
                                            res.send({
                                                token,
                                                user: {
                                                    id: user._id,
                                                    username: user.username,
                                                    email: user.email
                                                }
                                            });
                                            console.log("User registered");
                                        }
                                    )
                                })
                        });
                    });
                }
            }
        })
}

module.exports.login = (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) res.status(400).json({ msg: "User does not exist" });
            bcrypt.compare(password, user.password)
                .then(matched => {
                    if (!matched) res.status(400).json(({ msg: "Invalid credentials" }))
                    jwt.sign(
                        { id: user._id },
                        config.get('jwtsecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.send({
                                token,
                                user: {
                                    id: user._id,
                                    username: user.username,
                                    email: user.email
                                }
                            });
                            console.log("Signed in successfully!")
                        }
                    )
                })
        })
}