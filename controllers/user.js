const User = require("../models/user");

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(400).json({
      error: err?.message,
    });
  }
};

const getAllUser = async (_req, res) => {
  try {
    const users = await User.find({}).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(400).json({
      error: err?.message,
    });
  }
};

const createUser = async (req, res) => {
  const { displayName } = req.body;
  try {
    const user = await User.find({
      displayName,
    });

    if (user.length > 0) {
      res.status(400).json({ error: "Display name is exist" });
    } else {
      const result = await User.create({
        displayName,
      });
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(400).json({ error: err?.message });
  }
};

module.exports = {
  getUserById,
  getAllUser,
  createUser,
};
