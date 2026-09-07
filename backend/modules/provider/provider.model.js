const sequelize = require('../../config/database');
const { QueryTypes } = require('sequelize');

// === FIXED: Query the real `users` table (where AuthPage registration
// actually writes provider accounts) instead of a separate, empty
// `providers` table that nothing in the live app ever inserts into. ===
async function findAllProviders() {
  const rows = await sequelize.query(
    `SELECT
       id,
       "firstName",
       "lastName",
       email,
       phone,
       address,
       "serviceType",
       "hourlyRate",
       "isVerified",
       "createdAt"
     FROM users
     WHERE role = 'provider'
     ORDER BY "createdAt" DESC`,
    { type: QueryTypes.SELECT }
  );
  return rows;
}

// Kept for backward compatibility with the old /api/providers/register
// endpoint (BecomeProvider.jsx), even though that flow currently isn't
// wired into App.jsx. Safe to remove later if you drop that form entirely.
async function insertProvider(data) {
  const query = `
    INSERT INTO providers (name, service, category, hourly_rate, distance, bio, image_url, rating, is_verified, "createdAt", "updatedAt")
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING *;
  `;
  const now = new Date();
  const values = [
    data.name,
    data.category,
    data.category,
    data.hourlyRate || 0,
    data.distance || 'Kathmandu',
    data.bio,
    data.imageUrl || null,
    data.rating || 5.0,
    data.isVerified || false,
    now,
    now
  ];

  const results = await sequelize.query(query, {
    replacements: values,
    type: QueryTypes.RAW
  });

  const rows = results[0];
  return Array.isArray(rows) ? rows[0] : rows;
}

async function fetchDashboardStats() {
  const statsQuery = `
    SELECT
      COUNT(*) FILTER (WHERE status = 'Completed') AS completed_jobs,
      COALESCE(SUM(price), 45200) AS total_earnings
    FROM jobs;
  `;
  const results = await sequelize.query(statsQuery, { type: QueryTypes.SELECT });
  const row = results[0] || {};

  return {
    earnings: Number(row.total_earnings) || 45200,
    completedJobs: Number(row.completed_jobs) || 28,
    rating: 4.9
  };
}

async function updateJobStatusInDb(jobId, status) {
  const query = `
    UPDATE jobs
    SET status = ?
    WHERE id = ?
    RETURNING *;
  `;
  const results = await sequelize.query(query, {
    replacements: [status, jobId],
    type: QueryTypes.RAW
  });
  const rows = results[0];
  return Array.isArray(rows) ? rows[0] : rows;
}

module.exports = {
  findAllProviders,
  insertProvider,
  fetchDashboardStats,
  updateJobStatusInDb,
};