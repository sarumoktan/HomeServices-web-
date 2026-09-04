const providerModel = require('./provider.model');

async function getAllProviders() {
  return await providerModel.findAllProviders();
}

async function createProvider(providerData) {
  const { name, category, hourlyRate, distance, bio, imageUrl } = providerData;
  const formattedData = {
    name,
    category,
    hourlyRate,
    distance: distance || '1.0 km',
    bio,
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400',
    rating: 5.0,
    isVerified: true
  };
  return await providerModel.insertProvider(formattedData);
}

async function getDashboardData() {
  return await providerModel.fetchDashboardStats();
}

async function updateJobStatus(jobId, status) {
  return await providerModel.updateJobStatusInDb(jobId, status);
}

module.exports = {
  getAllProviders,
  createProvider,
  getDashboardData,
  updateJobStatus,
};