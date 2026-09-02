const providerService = require('./provider.service');

const getProviders = async (req, res, next) => {
  try {
    const { service, search } = req.query;
    const providers = await providerService.getAllProviders(service, search);
    res.status(200).json({ success: true, data: providers });
  } catch (error) {
    next(error);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    // Assuming user/provider ID is attached via auth middleware (fallback to ID 1 for testing)
    const providerId = 1;   
    const dashboardData = await providerService.getProviderDashboardData(providerId);
    res.status(200).json({ success: true, data: dashboardData });
  } catch (error) {
    next(error);
  }
};

const updateJobStatus = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { status } = req.body;
    const updatedJob = await providerService.updateJobStatus(jobId, status);
    res.status(200).json({ success: true, message: 'Job status updated successfully', data: updatedJob });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProviders,
  getDashboard,
  updateJobStatus,
};