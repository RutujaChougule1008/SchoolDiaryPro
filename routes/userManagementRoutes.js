// src/routes/userManagementRoutes.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userManagementController'); // Import the users controller

// Define user-related routes
router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser); // Assuming you use a route parameter for user ID
router.delete('/:id', usersController.deleteUser); // Assuming you use a route parameter for user ID

module.exports = router;
