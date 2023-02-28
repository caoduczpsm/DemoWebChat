const express = require('express');
const router = express.Router();
const { registerUser, authUser, index, logout, showRegisterForm } = require('../.././controllers/userController');

router.post('/home', authUser);
router.get('/registerForm', showRegisterForm);
router.post('/register', registerUser);
router.get('/logout', logout);
router.get('/home', index);

module.exports = router;