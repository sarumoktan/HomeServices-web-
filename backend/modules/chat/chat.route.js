// backend/modules/chat/chat.route.js
const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('./chat.controller');
const { verifyToken } = require('../../middleware/validator.middleware'); // Adjust path as needed

router.get('/:jobId', verifyToken, getMessages);
router.post('/', verifyToken, sendMessage);

module.exports = router;