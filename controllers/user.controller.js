const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const { UniqueConstraintError } = require('sequelize');

// CREATE USER
exports.createUser = async (req, res, next) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return next({
      type: 'validation',
      errors: errors.array()
    });
  }

  try {
    const user = await User.create(req.body);
    return res.status(201).json({ message: 'User created', data: user });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      error.statusCode = 400;
    }
    next(error);
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

//  GET USER BY ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

//  UPDATE USER
exports.updateUser = async (req, res, next) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return next({
      type: 'validation',
      errors: errors.array()
    });
  }

  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      return res.status(200).json({ message: 'User updated', data: updatedUser });
    } else {
      const error = new Error('User not found or no changes made');
      error.statusCode = 404;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

//  DELETE USER
exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });

    if (deleted) {
      return res.status(200).json({ message: 'User deleted successfully' });
    } else {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};
