const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite:./sqlite.db', {
  logging: false,
});

module.exports = { sequelize };

