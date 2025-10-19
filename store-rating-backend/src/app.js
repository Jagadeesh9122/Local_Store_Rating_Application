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
app.use(cors({
  origin: [
    "http://localhost:3000",                        
    "https://local-store-rating-application.vercel.app" 
  ],
  credentials: true
}));

app.use(express.json()); 
app.use('/api/auth', authRoutes); 
app.use('/api/admin', adminRoutes); 
app.use('/api/stores', storeRoutes); 
app.use('/api/user', userRoutes); 
app.use('/api/owner', ownerRoutes); 
app.use((req, res) => res.status(404).json({ msg: 'Not found' })); module.exports = app;