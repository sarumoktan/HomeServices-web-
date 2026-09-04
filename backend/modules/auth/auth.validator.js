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
    .optional({ checkFalsy: true })
    .trim()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\+?[1-9]\d{7,14}$/).withMessage('Invalid phone number format'),

  body().custom((value, { req }) => {
    if (!req.body.email && !req.body.phone) {
      throw new Error('Either email or phone number is required');
    }
    return true;
  }),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

  body('role')
    .trim()
    .notEmpty().withMessage('Role is required')
    .isIn(['user', 'provider']).withMessage('Role must be either user or provider'),

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
    .optional({ checkFalsy: true })
    .trim()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\+?[1-9]\d{7,14}$/).withMessage('Invalid phone number format'),

  body().custom((value, { req }) => {
    if (!req.body.email && !req.body.phone) {
      throw new Error('Either email or phone number is required');
    }
    return true;
  }),
];

const verifyOtpValidator = [
  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\+?[1-9]\d{7,14}$/).withMessage('Invalid phone number format'),

  body().custom((value, { req }) => {
    if (!req.body.email && !req.body.phone) {
      throw new Error('Either email or phone number is required');
    }
    return true;
  }),

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