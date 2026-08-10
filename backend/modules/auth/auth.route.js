const express = require('express');
const router = express.Router();

const { register,verifyEmailController,resendVerification,login,} = require('./auth.controller');

const {registerValidator,resendVerificationValidator,loginValidator,} = require('./auth.validator');


const validate = require('../../middleware/validator.middleware');
//router.post securely sends data in req.body. Execution order (left to right): validator checks fields -> validation middleware checks errors -> controller processes request.
router.post('/register', registerValidator, validate, register);
//GET route because email verification is triggered by a browser clicking a link. `:token` is a dynamic URL parameter used to capture the verification token.
router.get('/verify-email/:token', verifyEmailController);
//POST route for resending verification emails. It runs the resendVerificationValidator first to check if a valid email is provided, then runs the validation middleware to catch errors.
router.post('/resend-verification', resendVerificationValidator, validate, resendVerification);
//POST route for user login. It runs the loginValidator first to check the provided credentials, then runs the validation middleware to catch errors.
router.post('/login', loginValidator, validate, login);

module.exports = router;

//we export the router at the end
// To make these routes available to the main application file (like app.js or server.js) where they are mounted.