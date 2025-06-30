const { body } = require('express-validator');
const User = require('../models/user.model'); 


exports.userValidationRules = () => [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters')
    .matches(/^[A-Za-z\s]+$/).withMessage('Name must contain only letters and spaces'),


  // body('email')
  //   .notEmpty().withMessage('Email is required')
  //   .isEmail().withMessage('Invalid email format'),

   body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        return Promise.reject('Email already exists');
      }
    }),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('phone')
    .optional()
    .isMobilePhone().withMessage('Invalid phone number'),
  
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),

  body('dob')
    .optional()
    .isISO8601().withMessage('Date of birth must be a valid date (YYYY-MM-DD)')
];
