    const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const storeRoutes = require('./routes/store.routes');
const userRoutes = require('./routes/user.routes');
const ownerRoutes = require('./routes/owner.routes');

const app = express();

app.use(morgan('dev'));
const cors = require('cors');

app.use(cors({
  origin: 'https://local-store-rating-application-8.onrender.com', // your frontend Render URL
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/owner', ownerRoutes);

// fallback
app.use((req, res) => res.status(404).json({ msg: 'Not found' }));

module.exports = app;
