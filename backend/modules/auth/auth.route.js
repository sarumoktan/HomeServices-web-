const express = require('express');
const router = express.Router();
const { register, verifyOtp, resendOtp, login, updateProfile } = require('./auth.controller');
const { registerValidator, verifyOtpValidator, resendOtpValidator, loginValidator } = require('./auth.validator');
const validate = require('../../middleware/validator.middleware');

// Register
router.post('/register', registerValidator, validate, register);

// Verify OTP
router.post('/verify-otp', verifyOtpValidator, validate, verifyOtp);

// Resend OTP
router.post('/resend-otp', resendOtpValidator, validate, resendOtp);

// Login
router.post('/login', loginValidator, validate, login);

// Update profile
router.put('/profile', updateProfile);

module.exports = router;
