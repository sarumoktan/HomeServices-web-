const express = require('express');
const router = express.Router();
const { getChatHistory, getConversations } = require('./chat.controller');
const { requireAuth } = require('../../middleware/auth.middleware');

router.get('/conversations', requireAuth, getConversations);
router.get('/:peerId/history', requireAuth, getChatHistory);

module.exports = router;