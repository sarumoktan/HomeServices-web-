const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'provider', 'User', 'Provider'),
    allowNull: false,
    defaultValue: 'user',
  },
  serviceType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hourlyRate: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  otpCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otpExpiresAt: DataTypes.DATE,
  otpAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  otpLastSentAt: DataTypes.DATE,
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;