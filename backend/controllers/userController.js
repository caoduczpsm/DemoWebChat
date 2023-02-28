const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { dynamooseToObject } = require('../util/mongoose');
const express = require('express');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const LocalStorage = require('node-localstorage').LocalStorage;

localStorage = new LocalStorage('./scratch');

const app = express();
app.use(session({ secret: 'ncaoduc', resave: true, saveUninitialized: true }))

index = asyncHandler(async (req, res) => {
    if (req.session.isLoggin)
        res.render('home', { user: dynamooseToObject(thisUser) });
    else {
        res.status(400);
        res.json({ messgae: 'Requied Login' })
    }
});

showRegisterForm = asyncHandler(async (req, res) => {
    res.render('register');
});

registerUser = asyncHandler(async (req, res, next) => {

    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        res.json({ messgae: 'Plesase Enter All The Fields' })
    }

    const userExists = await User.get({ "email": email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const _id = uuidv4();

    const user = await User.create({
        email,
        _id,
        name,
        password,
        pic,
    })

    if (user) {
        req.session.isLoggin = true;
        req.session.email = email;
        res.render('home');
    } else {
        res.status(400);
        res.json({ messgae: error.message })
    }

});


authUser = asyncHandler(async (req, res) => {


    const { email, password } = req.body;

    const user = await User.get({ "email": email });

    //const id = user._id;

    // const token = jwt.sign({ id }, 'ncaoduc@tma.com.vn', {
    //     expiresIn: "30d",
    // });

    if (user && (user.password === password)) {
        // res.json({
        //     email: user.email,
        //     _id: user._id,
        //     name: user.name,
        //     isAdmin: user.isAdmin,
        //     pic: user.pic,
        //     token: token
        // });

        localStorage.setItem('userInfo', user.email);
        res.render('home');
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});


logout = asyncHandler(async (req, res) => {
    res.render('login')
});

// updateProfile = asyncHandler(async (req, res) => {

//     const email = req.session.email;
//     const formData = req.body;
//     const user = await User.findOne({ email });
//     user.updateOne({ _id: user._id }, formData).then(() => {
//         res.json(user);
//     });
// });

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


module.exports = { registerUser, authUser, index, logout, showRegisterForm };