const express = require('express');
const router = express.Router();
const { getProfile } = require('./user.controller');
const authMiddleware = require('../../middleware/validator.middleware');

router.get('/profile', authMiddleware, getProfile);

module.exports = router;