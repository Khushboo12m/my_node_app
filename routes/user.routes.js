const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { userValidationRules } = require('../validators/user.validator');

// Create
router.post('/users', userValidationRules(), userController.createUser);

// Read All
router.get('/users', userController.getAllUsers);

// Read by ID
router.get('/users/:id', userController.getUserById);

// Update
router.put('/users/:id', userValidationRules(), userController.updateUser);

// Delete
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
