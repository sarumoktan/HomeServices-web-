const validateJobStatusUpdate = (req, res, next) => {
  const { status } = req.body;
  
  // List of allowed job statuses
  const allowedStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];

  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status provided. Allowed values are: ${allowedStatuses.join(', ')}`
    });
  }
  next();
};

module.exports = {
  validateJobStatusUpdate,
};