// Auth Routes
const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const authValidator = require('./auth.validator');

router.post('/register', authValidator.validateRegister, authController.register);
router.post('/login', authValidator.validateLogin, authController.login);

module.exports = router;
