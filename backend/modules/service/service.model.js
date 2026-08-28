const { DataTypes } = require('sequelize');
// Import the database connection instance
const sequelize = require('../../config/database');

// Define the Service model mapped to the 'services' table in PostgreSQL
const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  provider: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  rating: {
    type: DataTypes.STRING(50),
    defaultValue: '0.0 (0)',
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'services',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false, // Disable updatedAt column since it's not in the SQL definition
});

module.exports = Service;