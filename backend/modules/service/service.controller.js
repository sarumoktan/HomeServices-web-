const Service = require('./service.model');

// Fetch all services or filter by category using Sequelize methods
exports.getServices = async (req, res) => {
  try {
    const { category } = req.query;
    let condition = category ? { where: { category } } : {};

    const services = await Service.findAll(condition);
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new service record using Sequelize
exports.createService = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.status(201).json({ success: true, data: newService });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};