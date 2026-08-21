const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');

// GET profile data to auto-fill the form
router.get('/profile/:userId', UserController.getProfile);

// POST/PUT profile data when saved/completed
router.post('/profile', UserController.updateProfile);

module.exports = router;