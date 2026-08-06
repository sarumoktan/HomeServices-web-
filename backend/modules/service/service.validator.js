// Service Validator
exports.validateCreate = (req, res, next) => {
  const { name, description, price, category } = req.body;
  
  if (!name || !description || !price || !category) {
    return res.status(400).json({ message: 'Name, description, price, and category are required' });
  }
  
  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ message: 'Price must be a positive number' });
  }
  
  next();
};

exports.validateUpdate = (req, res, next) => {
  const { price } = req.body;
  
  if (price && (isNaN(price) || price <= 0)) {
    return res.status(400).json({ message: 'Price must be a positive number' });
  }
  
  next();
};
