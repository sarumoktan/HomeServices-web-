const User = require('./user.model');

const getProfileById = async (userId) => {
  const user = await User.findById(userId).select('-password');
  return user;
};

module.exports = { getProfileById };
