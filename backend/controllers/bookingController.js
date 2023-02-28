const asyncHandler = require('express-async-handler');
const BlockList = require('../models/Blocklist');
const BlockHistory = require('../models/BlockHistory');
const express = require('express');
const LocalStorage = require('node-localstorage').LocalStorage;

localStorage = new LocalStorage('./scratch');

const app = express();

checkUserInBlocklist = asyncHandler(async (req, res, next) => {

    const userEmail = localStorage.getItem('userInfo');
    //console.log(userEmail);
    const blocklist = await BlockList.get({ "email": userEmail });
    //console.log(blocklist);
    const blockHistoryId = blocklist.blockhistory;
    //console.log(blockHistoryId);
    const blockHistory = await BlockHistory.get({ "_id": blockHistoryId });
    //console.log(blockHistory);
    if (blocklist && (blockHistory.blockstate === "BLOCKED")) {
        res.status(403);
        res.json({ message: "Please contact to admin system to book this rom!" });
    } else {
        next();
    }
});

booking = asyncHandler(async (req, res, next) => {
    res.json({ message: "Booking Successful" });
});




module.exports = { checkUserInBlocklist, booking };