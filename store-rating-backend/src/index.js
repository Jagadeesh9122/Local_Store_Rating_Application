require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./config/db');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.sync(); // use { force: true } only for dev reset
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
