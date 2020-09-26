const express = require('express')
const router = express.Router()
const usersController =   require('../controllers/usersController');

// Retrieve all employees
router.get('/', usersController.findAll);
// Create a new employee
router.post('/', usersController.create);
// Retrieve a single employee with id
router.get('/:id', usersController.findById);
// Update a employee with id
router.put('/:id', usersController.update);
// Delete a employee with id
router.delete('/:id', usersController.delete);

module.exports = router