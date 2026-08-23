// validators/userValidator.js

exports.validateUpdate = (req, res, next) => {
  const { email, name, phone } = req.body;

  // Validate email
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  // Validate name
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters long",
      });
    }
  }

  // Validate phone
  if (phone !== undefined) {
    if (!/^[0-9]{10}$/.test(String(phone))) {
      return res.status(400).json({
        success: false,
        message: "Phone number must contain exactly 10 digits",
      });
    }
  }

  next();
};
