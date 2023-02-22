const express = require('express');
const router = express.Router();

const siteController = require('../controllers/siteController');

router.get('/register', siteController.register);
router.get('/', siteController.login);

module.exports = router;