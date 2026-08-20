// backend/modules/auth/auth.validator.js
const { body } = require('express-validator');

const registerValidator = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 characters'),

  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be 2-50 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\+?[1-9]\d{7,14}$/).withMessage('Invalid phone number format'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

  // Registration only ever offers "user" or "provider" from the frontend.
  // "admin" accounts should be created manually/seeded, not via public registration.
  body('role')
    .trim()
    .notEmpty().withMessage('Role is required')
    .isIn(['user', 'provider']).withMessage('Role must be either user or provider'),

  // Only required when registering as a provider
  body('serviceType')
    .if(body('role').equals('provider'))
    .trim()
    .notEmpty().withMessage('Service type is required for providers'),

  body('hourlyRate')
    .if(body('role').equals('provider'))
    .notEmpty().withMessage('Hourly rate is required for providers')
    .isFloat({ gt: 0 }).withMessage('Hourly rate must be a positive number'),
];

const resendOtpValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
];

const verifyOtpValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('otp')
    .trim()
    .notEmpty().withMessage('Verification code is required')
    .matches(/^\d{6}$/).withMessage('Verification code must be 6 digits'),
];

const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  body('password')
    .notEmpty().withMessage('Password is required'),
];

module.exports = {
  registerValidator,
  resendOtpValidator,
  verifyOtpValidator,
  loginValidator,
};

