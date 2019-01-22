const express = require('express');
const cors = require('cors');
const helment = require('helmet');
const session = require('express-session');

const sessionConfig = {
    name: 'monkey',
    secret: 'sfDASF234@$@#$asfas',
    cookie: {
        maxAge: 1000 * 60 * 5, // 5 minutes
        secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false
};


function protected(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "You must log in for access" });
    };
};


module.exports = server => {
    server.use(express.json()),
    server.use(cors()),
    server.use(helment()),
    server.use(session(sessionConfig)),
    protected()
};