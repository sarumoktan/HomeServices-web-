const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Adjust path to your sequelize instance

const Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'profiles',
    timestamps: true,
    createdAt: 'created_at',
    updated_at: 'updated_at'
});

module.exports = Profile;