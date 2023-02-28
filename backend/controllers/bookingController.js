const asyncHandler = require('express-async-handler');
const BlockList = require('../models/Blocklist');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const LocalStorage = require('node-localstorage').LocalStorage;

localStorage = new LocalStorage('./scratch');

const app = express();

checkUserInBlocklist = asyncHandler(async (req, res, next) => {

    const userEmail = localStorage.getItem('userInfo');

    const blocklist = await BlockList.get({ "email": userEmail });
    console.log(blocklist);
    if (blocklist) {
        res.status(403);
        res.json({ message: "Contact to admin system to book this rom!" });
    } else {
        next();
    }
});

booking = asyncHandler(async (req, res, next) => {
    res.json({ message: "Booking Successful" });
});




module.exports = { checkUserInBlocklist, booking };