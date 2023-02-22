
const User = require('../models/User');
const { mongooseToObject, multipleMongooseToObject } = require('../util/mongoose');

// const express = require('express');
// const session = require('express-session');

// const app = express();
// app.use(session({ secret: 'ncaoduc', resave: true, saveUninitialized: true }))

class siteController {
    // GET /
    index(req, res, next) {
        res.render('home');
    }

    async login(req, res, next) {
        if (req.session.isLoggin) {
            let email = req.session.email;
            const user = await User.findOne({ email });
            const allUsers = await User.find({});
            res.render('home', { user: mongooseToObject(user), allUsers: multipleMongooseToObject(allUsers) });
            return;
        }
        res.render('login');
    }

    register(req, res, next) {
        res.render('register');
    }

}

module.exports = new siteController();
