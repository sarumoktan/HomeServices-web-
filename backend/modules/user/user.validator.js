// User Validator
exports.validateUpdate = (req, res, next) => {
  const { email, name, phone } = req.body;
  
  if (email && !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  
  next();
};
