const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create Sequelize connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
  }
);

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ PostgreSQL Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to PostgreSQL");
    console.error(err.message);
  });

// Export sequelize object
module.exports = sequelize;
