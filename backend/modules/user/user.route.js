// User Routes
const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const userValidator = require('./user.validator');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userValidator.validateUpdate, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
