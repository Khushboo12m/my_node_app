const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const { UniqueConstraintError } = require('sequelize');


// CREATE USER
exports.createUser = async (req, res) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await User.create(req.body);
    return res.status(201).json({ message: 'User created', data: user });
  } catch (error) {

     // Handle Sequelize unique constraint error (email already exists)
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    return res.status(500).json({ error: error.message });
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//  GET USER BY ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//  UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      return res.status(200).json({ message: 'User updated', data: updatedUser });
    } else {
      return res.status(404).json({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//  DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });

    if (deleted) {
      return res.status(200).json({ message: 'User deleted successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
