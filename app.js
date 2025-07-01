const express = require('express');
const app = express();
require('dotenv').config(); 
const sequelize = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

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
  const error = new Error('Route not found');
  error.statusCode = 404;
  next(error); 
});


// Register the error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
