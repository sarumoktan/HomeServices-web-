/**
 * chat.model.js (Sequelize / Postgres)
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ChatMessage = sequelize.define(
  'ChatMessage',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    senderRole: {
      type: DataTypes.ENUM('customer', 'provider'),
      allowNull: false,
    },

    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'chat_messages',
    timestamps: true,

    indexes: [
      {
        fields: ['roomId'],
      },
      {
        fields: ['roomId', 'createdAt'],
      },
    ],
  }
);

module.exports = ChatMessage;