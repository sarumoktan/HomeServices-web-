const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Provider = sequelize.define('Provider', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  service: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 4.9,
  },
  reviewsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: 'Kathmandu',
  },
  pricePerHour: {
    type: DataTypes.FLOAT,
    defaultValue: 350,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'providers',
  timestamps: true,
});

module.exports = Provider;