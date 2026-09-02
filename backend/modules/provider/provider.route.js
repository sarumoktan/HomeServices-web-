const express = require('express');
const router = express.Router();
const providerController = require('./provider.controller');

// Customer view endpoint
router.get('/', providerController.getProviders);

// Provider dashboard endpoints
router.get('/dashboard', providerController.getDashboard);
router.patch('/jobs/:jobId/status', providerController.updateJobStatus);

module.exports = router;