const express = require('express');
const router = express.Router();
const providerController = require('./provider.controller');

router.get('/', providerController.getProviders);
router.post('/register', providerController.registerProvider);
router.get('/dashboard', providerController.getDashboard);
router.patch('/jobs/:jobId/status', providerController.updateJobStatus);

module.exports = router;