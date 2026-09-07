const providerModel = require('./provider.model');

// === FIXED: findAllProviders() now returns raw `users` rows (firstName,
// lastName, serviceType, etc). ServicesPage.jsx and ProviderCard expect a
// flatter shape (name, service, category, rating, hourlyRate, ...), so we
// map the DB rows into that shape here rather than changing every frontend
// component that consumes it. ===
function formatProviderForFrontend(row) {
  const fullName = [row.firstName, row.lastName].filter(Boolean).join(' ').trim() || 'Unnamed Provider';
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '??';

  return {
    id: row.id,
    name: fullName,
    service: row.serviceType,
    category: row.serviceType,
    hourlyRate: row.hourlyRate != null ? Number(row.hourlyRate) : 0,
    price: row.hourlyRate != null ? Number(row.hourlyRate) : 0,
    rating: 5.0,
    reviews: 0,
    jobs: 0,
    available: true,
    verified: !!row.isVerified,
    distance: row.address || 'Kathmandu',
    bio: '',
    initials,
    grad: 'bg-gradient-to-br from-[#2E4CDB] to-[#1d35a6]',
    email: row.email,
    phone: row.phone,
    createdAt: row.createdAt,
  };
}

async function getAllProviders() {
  const rows = await providerModel.findAllProviders();
  return rows.map(formatProviderForFrontend);
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