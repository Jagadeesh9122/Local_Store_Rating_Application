const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Store = sequelize.define('Store', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: true },
  address: { type: DataTypes.STRING(1000), allowNull: true },
  ownerId: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: 'Stores',
});

module.exports = Store;
