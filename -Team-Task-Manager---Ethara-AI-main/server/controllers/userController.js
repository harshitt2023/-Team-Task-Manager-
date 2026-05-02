const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email role _id');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};