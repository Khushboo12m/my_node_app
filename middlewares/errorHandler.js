const { ValidationError, UniqueConstraintError } = require('sequelize');

const errorHandler = (err, req, res, next) => {
  console.log('Global Error Handler Reached');

  console.error(' Error:', err);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Express validator error(default)
  if (err.type === 'validation') {
    console.log(' Express Validator Error Detected');

    statusCode = 422;
    return res.status(statusCode).json({  
      success: false,
      statusCode:422, 
      errors: err.errors, 
    });
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;

