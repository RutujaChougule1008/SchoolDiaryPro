const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Define routes
router.post('/', attendanceController.recordAttendance);
module.exports = router;