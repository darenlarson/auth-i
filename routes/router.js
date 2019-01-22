const express = require('express');
const bcrypt = require('bcryptjs');
const protected = require('../config/protected.js');

const db = require('../data/dbConfig.js');

const router = express.Router();


//routes
// login route
router.post('/login', (req, res) => {
    const creds = req.body // grab username and password fro the body

    db('users')
        .where({ username: creds.username }).first()
            .then(user => {
                 if (user && bcrypt.compareSync(creds.password, user.password)) {
                     // passwords match and user exists by that username
                     req.session.user = user;
                     res.status(200).json({ message: 'Welcome!' });
                 } else {
                     res.status(404).json({ message: 'Please try again.' });
                 };
            })
            .catch(err => {
                res.status(500).json(err);
            });
});

// register route
router.post('/register', (req, res) => {
    const creds = req.body; // grab username and password from body
    const hash = bcrypt.hashSync(creds.password, 14); // Generate hash from the user's password. # of rounds is 2^x
    creds.password = hash; // override user.password with the hash

    // save the user to the database
    db('users')
        .insert(creds)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


// get all users route. This route should be protected so that only authenticated users should see it
router.get('/users', protected, (req, res) => {
    db('users')
        .select('id', 'username', 'password')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// logout route
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).send('error logging out');
            } else {
                res.status(200).send('Logged out');
            };
        });
    } else {
        res.json({ message: "You're already logged out" });
    };
});

module.exports = router;
