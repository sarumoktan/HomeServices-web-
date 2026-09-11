const express = require('express');
const router = express.Router();
const providerController = require('./provider.controller');
const { requireAuth } = require('../../middleware/auth.middleware');

router.get('/', providerController.getProviders);
router.post('/register', providerController.registerProvider);
router.get('/dashboard', requireAuth, providerController.getDashboard);
router.patch('/jobs/:jobId/status', providerController.updateJobStatus);

module.exports = router;