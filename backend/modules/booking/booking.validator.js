// booking.validator.js
const Joi = require('joi');

const bookingValidationSchema = Joi.object({
  user: Joi.string().required(),
  date: Joi.date().required(),
  status: Joi.string().valid('pending', 'confirmed', 'cancelled')
});

exports.validateBooking = (req, res, next) => {
  const { error } = bookingValidationSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return res.status(400).json({ message: errorMessage });
  }
  
  next();
};
