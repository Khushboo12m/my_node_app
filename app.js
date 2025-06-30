const express = require('express');
const app = express();
require('dotenv').config(); 
const sequelize = require('./config/db');

// Connect to DB
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error(' Unable to connect to the database:', err.message);
  });

// Middleware to parse JSON
app.use(express.json());

//  Routes
const userRoutes = require('./routes/user.routes');
app.use('/api', userRoutes); 

// Handle unknown routes (404)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
