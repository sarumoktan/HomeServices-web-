const UserService = require('./user.service');

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserService.getProfileById(userId);
    if (!user) {
      return res.status(404).json({ message: "User vetiyena" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getProfile };
