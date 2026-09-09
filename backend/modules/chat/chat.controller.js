const { getRoomId, getHistory } = require('./chat.service');
const Message = require('./chat.model');
const { Op } = require('sequelize');

async function getChatHistory(req, res) {
  try {
    const userId = req.user.id;
    const { peerId } = req.params;

    const roomId = getRoomId(userId, peerId);
    const history = await getHistory(roomId);

    res.json({ roomId, history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getConversations(req, res) {
  try {
    const userId = req.user.id;

    const messages = await Message.findAll({
      where: {
        roomId: { [Op.like]: `%${userId}%` },
      },
      order: [['createdAt', 'DESC']],
    });

    const roomsMap = {};
    for (const m of messages) {
      if (!roomsMap[m.roomId]) {
        roomsMap[m.roomId] = m;
      }
    }

    const conversations = Object.values(roomsMap).map((m) => {
      const ids = m.roomId.split('_');
      const peerId = ids.find((id) => id !== userId);
      return {
        roomId: m.roomId,
        peerId,
        lastMessage: m.text,
        lastMessageTime: m.createdAt,
      };
    });

    res.json({ success: true, data: conversations });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { getChatHistory, getConversations };