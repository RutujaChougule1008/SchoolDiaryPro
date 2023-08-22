const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Define routes
router.post('/', examController.createExam);
module.exports = router;