const express = require('express');
const router = express.Router();
const parentsController = require('../controllers/parentsController');

// Define routes
router.post('/', parentsController.createParent);
router.get('/', parentsController.getAllParents);
router.get('/:id', parentsController.getParentById);
router.put('/:id', parentsController.updateParent);
router.delete('/:id', parentsController.deleteParent);

module.exports = router;
