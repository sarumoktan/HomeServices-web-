// Booking Routes
const express = require('express');
const router = express.Router();
const bookingController = require('./booking.controller');
const { validateBooking } = require('./booking.validator');

router.route('/')
  .get(bookingController.getAllBookings)
  .post(validateBooking, bookingController.createBooking);

router.route('/:id')
  .get(bookingController.getBookingById)
  .put(validateBooking, bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;