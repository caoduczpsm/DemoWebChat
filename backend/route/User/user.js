const express = require('express');
const router = express.Router();
const { registerUser, authUser, index, logout, showRegisterForm, updateProfile } = require('../.././controllers/userController');

router.post('/home', authUser);
router.get('/registerForm', showRegisterForm);
router.post('/register', registerUser);
router.get('/:id/edit-profile', updateProfile);
router.get('/logout', logout);
router.get('/home', index);

module.exports = router;