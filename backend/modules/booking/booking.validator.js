// Booking Validator
exports.validateCreate = (req, res, next) => {
  const { userId, providerId, serviceId, bookingDate } = req.body;
  
  if (!userId || !providerId || !serviceId || !bookingDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  next();
};

exports.validateUpdate = (req, res, next) => {
  const { status } = req.body;
  
  if (status && !['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  
  next();
};
