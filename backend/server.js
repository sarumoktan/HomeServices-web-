const logger = require("./utils/logger");
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); // CORS enabled here

// Auth Routes Mounting
const authRoutes = require('./modules/auth/auth.route');
app.use('/api/auth', authRoutes);

// User Routes Mounting
const userRoutes = require('./modules/user/user.route');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

// Sync database tables and then start server
sequelize.sync({ alter: true })
.then(() => {
    console.log('Database synchronized successfully');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        logger.info("Backend server started successfully");
    });
})
.catch((err) => {
    console.error('Unable to connect to the database:', err);
});
