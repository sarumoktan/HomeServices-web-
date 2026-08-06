// Booking Routes
const express = require('express');
const router = express.Router();
const bookingController = require('./booking.controller');
const bookingValidator = require('./booking.validator');

router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/', bookingValidator.validateCreate, bookingController.createBooking);
router.put('/:id', bookingValidator.validateUpdate, bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
