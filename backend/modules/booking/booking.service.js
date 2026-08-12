// Booking Service
const Booking = require('./booking.model');

exports.getAllBookings = async () => {
  return await Booking.find();
};

exports.getBookingById = async (id) => {
  const booking = await Booking.findById(id);
  if (!booking) {
    throw new Error('Booking not found');
  }
  return booking;
};

exports.createBooking = async (bookingData) => {
  const booking = new Booking(bookingData);
  return await booking.save();
};

exports.updateBooking = async (id, bookingData) => {
  const updatedBooking = await Booking.findByIdAndUpdate(id, bookingData, {
    new: true,
    runValidators: true
  });
  
  if (!updatedBooking) {
    throw new Error('Booking not found for update');
  }
  
  return updatedBooking;
};

exports.deleteBooking = async (id) => {
  const deletedBooking = await Booking.findByIdAndDelete(id);
  if (!deletedBooking) {
    throw new Error('Booking not found for deletion');
  }
  return deletedBooking;
};