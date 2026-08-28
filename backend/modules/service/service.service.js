const Service = require('./service.model');

class ServiceService {
  // Fetch all services or filter by category
  async getAll(category) {
    const condition = category ? { where: { category } } : {};
    return await Service.findAll(condition);
  }

  // Find a single service by its primary key ID
  async getById(id) {
    return await Service.findByPk(id);
  }

  // Create a new service record in the database
  async create(data) {
    return await Service.create(data);
  }

  // Update an existing service record by ID
  async update(id, data) {
    const service = await Service.findByPk(id);
    if (!service) return null;
    return await service.update(data);
  }

  // Delete a service record by ID
  async remove(id) {
    const service = await Service.findByPk(id);
    if (!service) return null;
    await service.destroy();
    return true;
  }
}

module.exports = new ServiceService();