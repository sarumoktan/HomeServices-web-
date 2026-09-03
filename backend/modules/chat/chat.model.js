// backend/modules/chat/chat.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Adjust to your sequelize connection file

const Chat = sequelize.define('Chat', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  jobId: {
    type: DataTypes.INTEGER, // Match your Booking model primary key type (INTEGER or UUID)
    allowNull: false
  },
  sender: {
    type: DataTypes.INTEGER, // Match your User model primary key type
    allowNull: false
  },
  receiver: {
    type: DataTypes.INTEGER, // Match your User model primary key type
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'chats',
  timestamps: false
});

module.exports = Chat;