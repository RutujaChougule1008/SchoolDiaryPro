// src/routes/userManagementRoutes.js

const express = require('express');
const router = express.Router();
const classroomsController = require('../controllers/classroomController'); // Import the users controller

router.post('/', classroomsController.createClassroom);
router.get('/', classroomsController.getAllClassrooms);
router.get('/:id', classroomsController.getClassroomById);
router.put('/:id', classroomsController.updateClassroom);
router.delete('/:id', classroomsController.deleteClassroom);


module.exports = router;
