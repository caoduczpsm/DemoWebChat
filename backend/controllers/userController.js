const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../config/generateToken');
const { find } = require('../models/User');
const { mongooseToObject } = require('../util/mongoose');
const express = require('express');
const session = require('express-session');

const app = express();
app.use(session({ secret: 'ncaoduc', resave: true, saveUninitialized: true }))

index = asyncHandler(async (req, res) => {
    if (req.session.isLoggin)
        res.render('home', { user: mongooseToObject(thisUser) });
    else {
        res.status(400);
        res.json({ messgae: 'Requied Login' })
    }
});

showRegisterForm = asyncHandler(async (req, res) => {
    res.render('register');
});

registerUser = asyncHandler(async (req, res, next) => {

    res.render('register');
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        res.json({ messgae: 'Plesase Enter All The Fields' })
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        res.json({ messgae: 'User Already Exists' })
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    }).then(() => {
        generateToken(user._id);
        req.session.isLoggin = true;
        req.session.email = email;
        res.render('home', { user: mongooseToObject(user) });
    }).catch(err => {
        res.status(400);
        res.json({ messgae: 'Failed To Create User' })
    });

});

authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    thisUser = user;
    req.session.email = email;
    if (user && (await user.matchPassword(password))) {
        req.session.isLoggin = true;
        res.render('home', { user: mongooseToObject(user) });
    } else {
        res.status(400);
        res.json({ messgae: 'Invalid Email or Password' })
    }
});


logout = asyncHandler(async (req, res) => {
    if (req.session.isLoggin) {
        req.session.destroy(function (err) {
            res.render('login')
        });
    }
});

updateProfile = asyncHandler(async (req, res) => {

    const email = req.session.email;
    const formData = req.body;
    const user = await User.findOne({ email });
    user.updateOne({ _id: user._id }, formData).then(() => {
        res.json(user);
    });
});

// /api/user?search=weiorwe
// allUsers = asyncHandler(async (req, res) => {
//     const keyword = req.query.search ? {
//         $or: [
//             { name: { $regex: req.query.search, $options: "i" } },
//             { email: { $regex: req.query.search, $options: "i" } },
//         ]
//     } : {};

//     const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

//     res.send(users);

// });


module.exports = { registerUser, authUser, index, logout, showRegisterForm, updateProfile };