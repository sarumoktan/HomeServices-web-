// Service Routes
const express = require('express');
const router = express.Router();
const serviceController = require('./service.controller');
const serviceValidator = require('./service.validator');

router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/', serviceValidator.validateCreate, serviceController.createService);
router.put('/:id', serviceValidator.validateUpdate, serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
