const express = require('express');
const router = express.Router();
const { register, verifyOtp, resendOtp, login } = require('./auth.controller');
const { registerValidator, verifyOtpValidator, resendOtpValidator, loginValidator } = require('./auth.validator');
const validate = require('../../middleware/validator.middleware');
//Register
router.post('/register', registerValidator, validate, register);
//POST route for the 6-digit code typed into the verify-email modal. POST, not GET, because the code is submitted from the app rather than by clicking a link in an email.
router.post('/verify-otp', verifyOtpValidator, validate, verifyOtp);
//POST route behind the "Resend Code" link. It runs the resendOtpValidator first to check if a valid email is provided, then runs the validation middleware to catch errors. The service throttles this to one code per minute.
router.post('/resend-otp', resendOtpValidator, validate, resendOtp);
//Login
router.post('/login', loginValidator, validate, login);
module.exports = router;

//we export the router at the end To make these routes available to the main application file (like app.js or server.js) where they are mounted.
