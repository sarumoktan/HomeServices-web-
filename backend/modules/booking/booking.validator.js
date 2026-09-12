'use strict';

/**
 * Uses your existing shared validator.middleware.js for error handling
 * (confirmed: express-validator based, returns 422 on failure) — no local
 * error handler needed.
 */
const { body, param } = require('express-validator');
const handleValidationErrors = require('../../middleware/validator.middleware'); // adjust path if not at this level

const VALID_TIME_SLOTS = [
  '08:00-10:00',
  '10:00-12:00',
  '12:00-14:00',
  '14:00-16:00',
  '16:00-18:00',
  '18:00-20:00',
];
// ^ Replace with your app's actual list of time slots (whatever populates
// the "Select a time slot" dropdown in Book Service). If slots are
// dynamic/generated server-side rather than fixed, drop the
// .isIn(VALID_TIME_SLOTS) check and just validate it's a non-empty string.

const validateCreateBooking = [
  body('providerId')
    .notEmpty().withMessage('providerId is required')
    .isUUID().withMessage('providerId must be a valid id'),
  body('serviceId')
    .notEmpty().withMessage('serviceId is required')
    .isInt({ min: 1 }).withMessage('serviceId must be a valid id'),
  body('bookingDate')
    .notEmpty().withMessage('bookingDate is required')
    .isISO8601().withMessage('bookingDate must be a valid date (YYYY-MM-DD)')
    .custom((value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const date = new Date(value);
      if (date < today) {
        throw new Error('bookingDate cannot be in the past');
      }
      return true;
    }),
  body('timeSlot')
    .notEmpty().withMessage('timeSlot is required')
    .isIn(VALID_TIME_SLOTS).withMessage('timeSlot is not a recognized slot'),
  body('serviceAddress')
    .trim()
    .notEmpty().withMessage('serviceAddress is required')
    .isLength({ min: 5, max: 255 }).withMessage('serviceAddress must be between 5 and 255 characters'),
  body('specialInstructions')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 1000 }).withMessage('specialInstructions must be under 1000 characters'),
  handleValidationErrors,
];

const validateBookingIdParam = [
  param('id')
    .notEmpty().withMessage('Booking id is required')
    .isInt({ min: 1 }).withMessage('Booking id must be a valid id'),
  handleValidationErrors,
];

module.exports = {
  validateCreateBooking,
  validateBookingIdParam,
  VALID_TIME_SLOTS,
};