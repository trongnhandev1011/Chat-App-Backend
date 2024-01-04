const { userModel } = require("../models/user");
const jwt = require("jsonwebtoken");

const getMyProfile = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];

  try {
    const data = jwt.verify(
      token,
      "RpXvOrMaOxRDkI1fSz8kuqHQksYaE/viQNyShxzaqMO7nKBFoyf2hnNOTQDt1Q6DWXiAKaH+BgeU/qc44TuuCg=="
    );

    if (data.role !== "authenticated") {
      res.status(401).json({
        error: "AUTHENTICATED_FAILED",
      });
    } else {
      const user = await getUserByEmail(data.user_metadata?.email);

      return res.status(200).json({
        user,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      error: "AUTHENTICATED_FAILED",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    return res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(400).json({
      error: err?.message,
    });
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await userModel.findOne({ email });
    return user;
  } catch (err) {
    res.status(400).json({
      error: err?.message,
    });
  }
};

const getAllUser = async (_req, res) => {
  try {
    const users = await userModel.find({}).sort({
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
    const user = await userModel.find({
      displayName,
    });

    if (user.length > 0) {
      res.status(400).json({ error: "Display name is exist" });
    } else {
      const result = await userModel.create({
        displayName,
      });
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(400).json({ error: err?.message });
  }
};

module.exports = {
  getMyProfile,
  getUserById,
  getUserByEmail,
  getAllUser,
  createUser,
};
