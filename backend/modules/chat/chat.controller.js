// backend/modules/chat/chat.controller.js
const Chat = require('./chat.model');

// Fetch message history for a specific job using Sequelize
exports.getMessages = async (req, res) => {
  try {
    const { jobId } = req.params;
    const messages = await Chat.findAll({
      where: { jobId },
      order: [['timestamp', 'ASC']]
    });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Save a new message using Sequelize
exports.sendMessage = async (req, res) => {
  try {
    const { jobId, receiver, message } = req.body;
    const sender = req.user.id; // Sequelize uses .id by default

    const newMessage = await Chat.create({
      jobId,
      sender,
      receiver,
      message
    });

    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};