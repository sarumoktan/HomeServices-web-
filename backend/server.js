// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database'); // Adjust this path if your database file is located elsewhere!

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Auth Routes Mounting
const authRoutes = require('./modules/auth/auth.route');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Sync database tables and then start server
sequelize.sync({ alter: true }) // or { force: true } if you want to recreate tables from scratch
  .then(() => {
    console.log('✅ Database synchronized successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err);
  });
  