const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  address: { type: DataTypes.STRING(1000), allowNull: true },
  role: { type: DataTypes.ENUM('admin', 'user', 'owner'), allowNull: false, defaultValue: 'user' },
}, {
  tableName: 'Users',
});

module.exports = User;
