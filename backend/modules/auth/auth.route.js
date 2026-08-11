const express = require('express');
const router = express.Router();
const { register,verifyEmailController,resendVerification,login,} = require('./auth.controller');
const {registerValidator,resendVerificationValidator,loginValidator,} = require('./auth.validator');
const validate = require('../../middleware/validator.middleware');
//Register
router.post('/register', registerValidator, validate, register);
router.get('/verify-email/:token', verifyEmailController);//GET route because email verification is triggered by a browser clicking a link. `:token` is a dynamic URL parameter used to capture the verification token.
router.post('/resend-verification', resendVerificationValidator, validate, resendVerification);
//Login
router.post('/login', loginValidator, validate, login);////POST route for resending verification emails. It runs the resendVerificationValidator first to check if a valid email is provided, then runs the validation middleware to catch errors.
module.exports = router;

//we export the router at the end To make these routes available to the main application file (like app.js or server.js) where they are mounted.