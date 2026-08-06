// Provider Routes
const express = require('express');
const router = express.Router();
const providerController = require('./provider.controller');
const providerValidator = require('./provider.validator');

router.get('/', providerController.getAllProviders);
router.get('/:id', providerController.getProviderById);
router.post('/', providerValidator.validateCreate, providerController.createProvider);
router.put('/:id', providerValidator.validateUpdate, providerController.updateProvider);
router.delete('/:id', providerController.deleteProvider);

module.exports = router;
