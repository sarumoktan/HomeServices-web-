const { body, validationResult } = require('express-validator');

// Helper middleware to check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Validation rules for creating a service
exports.validateCreate = [
  body('title').notEmpty().withMessage('Title is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('provider').notEmpty().withMessage('Provider name is required'),
  body('price').notEmpty().withMessage('Price is required'),
  body('desc').notEmpty().withMessage('Description is required'),
  body('image').notEmpty().withMessage('Image URL is required'),
  validate,
];

// Validation rules for updating a service
exports.validateUpdate = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('category').optional().notEmpty().withMessage('Category cannot be empty'),
  body('price').optional().notEmpty().withMessage('Price cannot be empty'),
  validate,
];