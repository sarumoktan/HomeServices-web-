const sequelize = require('../../config/database');
const { QueryTypes } = require('sequelize');

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

// === FIXED (2nd pass): the real table is `bookings`, not `jobs` — jobs
// never existed for this data. Also `status` values are lowercase
// ('completed', not 'Completed') per the Booking model's enum. Earnings
// come from joining to `services` for price, since bookings itself has
// no price column. There is currently no rating data anywhere in the
// schema (no reviews table), so rating is returned as null rather than
// faked — a real "Average Rating" needs a reviews table added later. ===
async function fetchDashboardStats(providerId) {
  const statsQuery = `
    SELECT
      COUNT(*) FILTER (WHERE b.status = 'completed') AS completed_jobs,
      COALESCE(SUM(CAST(s.price AS NUMERIC)) FILTER (WHERE b.status = 'completed'), 0) AS total_earnings
    FROM bookings b
    LEFT JOIN services s ON s.id = b."serviceId"
    WHERE b."providerId" = ?;
  `;
  const activeQuery = `
    SELECT
      b.id,
      b."bookingDate",
      b."timeSlot",
      b.status,
      u."firstName" AS "customerFirstName",
      u."lastName" AS "customerLastName"
    FROM bookings b
    LEFT JOIN users u ON u.id = b."customerId"
    WHERE b."providerId" = ?
      AND b.status IN ('pending', 'confirmed')
    ORDER BY b."bookingDate" ASC;
  `;

  const statsResults = await sequelize.query(statsQuery, {
    replacements: [providerId],
    type: QueryTypes.SELECT
  });
  const activeResults = await sequelize.query(activeQuery, {
    replacements: [providerId],
    type: QueryTypes.SELECT
  });

  const row = statsResults[0] || {};

  return {
    earnings: Number(row.total_earnings) || 0,
    completedJobs: Number(row.completed_jobs) || 0,
    rating: null, // no reviews table exists yet — see note above
    activeRequests: activeResults
  };
}

// === FIXED: was updating a nonexistent `jobs` table — bookings live in
// `bookings`. Status values must match the Booking model's enum exactly:
// 'pending' | 'confirmed' | 'completed' | 'cancelled'. ===
async function updateJobStatusInDb(jobId, status) {
  const query = `
    UPDATE bookings
    SET status = ?, "updatedAt" = NOW()
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