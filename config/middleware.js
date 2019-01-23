const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
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

module.exports = server => {
    server.use(express.json()),
    server.use(helmet()),
    server.use(cors()),
    server.use(session(sessionConfig))
}