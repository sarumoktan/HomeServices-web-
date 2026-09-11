const providerService = require('./provider.service');

async function getProviders(req, res) {
  try {
    const providers = await providerService.getAllProviders();
    res.status(200).json({ success: true, data: providers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function registerProvider(req, res) {
  try {
    const { category, serviceType, hourlyRate } = req.body;
    const effectiveServiceType = serviceType || category;

    if (!effectiveServiceType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Service type is required for providers' 
      });
    }
    if (!hourlyRate || Number(hourlyRate) <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Hourly rate must be a positive number' 
      });
    }

    const newProvider = await providerService.createProvider(req.body);
    res.status(201).json({
      success: true,
      message: 'Provider profile registered successfully!',
      data: newProvider
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// === FIXED: dashboardData was never fetched — the call to
// providerService.getDashboardData() was missing entirely, so this threw
// "dashboardData is not defined" on every request. Now it actually calls
// the service, passing the logged-in provider's id so results are scoped
// to them instead of every provider combined. ===
async function getDashboard(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated — no provider id found on request.'
      });
    }

    const dashboardData = await providerService.getDashboardData(req.user.id);
    res.status(200).json({ success: true, data: dashboardData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function updateJobStatus(req, res) {
  try {
    const { jobId } = req.params;
    const { status } = req.body;
    const updatedJob = await providerService.updateJobStatus(jobId, status);
    res.status(200).json({ success: true, data: updatedJob });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  getProviders,
  registerProvider,
  getDashboard,
  updateJobStatus,
};