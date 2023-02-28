const express = require('express');
const router = express.Router();
const { checkUserInBlocklist, booking } = require('../.././controllers/bookingController');

router.get('/booking', checkUserInBlocklist, booking);

module.exports = router;