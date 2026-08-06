// Provider Validator
exports.validateCreate = (req, res, next) => {
  const { name, email, phone, services } = req.body;
  
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Name, email, and phone are required' });
  }
  
  next();
};

exports.validateUpdate = (req, res, next) => {
  const { email } = req.body;
  
  if (email && !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  
  next();
};
