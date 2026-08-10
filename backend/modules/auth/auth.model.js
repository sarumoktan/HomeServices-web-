// backend/modules/auth/auth.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");// adjust path if your db.js lives elsewhere

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "provider", "admin"),
      defaultValue: "user",
    },
    serviceType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hourlyRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
