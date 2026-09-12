'use strict';

/**
 * UPDATED: providerId now validated against the `users` table with
 * role = 'provider' (confirmed value from your provider service's raw
 * SQL query), since there's no separate Provider model.
 */
const { Op } = require('sequelize');
const sequelize = require('../../config/database');
const Booking = require('./booking.model');
const User = require('../auth/auth.model'); // confirmed: this is the real User model, NOT modules/user/user.model.js (that file is mislabeled and actually contains Profile)
const Service = require('../service/service.model');

class BookingConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BookingConflictError';
    this.statusCode = 409;
  }
}

class BookingNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BookingNotFoundError';
    this.statusCode = 404;
  }
}

class BookingForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BookingForbiddenError';
    this.statusCode = 403;
  }
}

async function createBooking({ customerId, providerId, serviceId, bookingDate, timeSlot, serviceAddress, specialInstructions }) {
  return sequelize.transaction(async (t) => {
    const [provider, service] = await Promise.all([
      User.findOne({ where: { id: providerId, role: 'provider' }, transaction: t }),
      Service.findByPk(serviceId, { transaction: t }),
    ]);
    if (!provider) {
      const err = new Error('Provider not found');
      err.statusCode = 404;
      throw err;
    }
    if (!service) {
      const err = new Error('Service not found');
      err.statusCode = 404;
      throw err;
    }

    const existing = await Booking.findOne({
      where: {
        providerId,
        bookingDate,
        timeSlot,
        status: { [Op.ne]: 'cancelled' },
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    if (existing) {
      throw new BookingConflictError('This provider is already booked for the selected date and time slot.');
    }

    const booking = await Booking.create(
      {
        customerId,
        providerId,
        serviceId,
        bookingDate,
        timeSlot,
        serviceAddress,
        specialInstructions: specialInstructions || null,
        status: 'pending',
      },
      { transaction: t }
    );

    return booking;
  });
}

async function getBookingsForCustomer(customerId) {
  return Booking.findAll({
    where: { customerId },
    include: [
      { model: User, as: 'provider' }, // trim `attributes` if you want to exclude password/otp fields from the response
      { model: Service, as: 'service' },
    ],
    order: [['bookingDate', 'DESC'], ['createdAt', 'DESC']],
  });
}

async function cancelBooking(bookingId, customerId) {
  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    throw new BookingNotFoundError('Booking not found');
  }
  if (booking.customerId !== customerId) {
    throw new BookingForbiddenError('You do not have permission to cancel this booking');
  }
  if (booking.status === 'cancelled') {
    return booking; // idempotent
  }
  if (booking.status === 'completed') {
    const err = new Error('Completed bookings cannot be cancelled');
    err.statusCode = 400;
    throw err;
  }

  booking.status = 'cancelled';
  await booking.save();
  return booking;
}

module.exports = {
  createBooking,
  getBookingsForCustomer,
  cancelBooking,
  BookingConflictError,
  BookingNotFoundError,
  BookingForbiddenError,
};