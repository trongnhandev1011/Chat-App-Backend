const { ChatSchema } = require("../models/chat");
const { Server } = require("socket.io");

const getChatById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await ChatSchema.findById(id);
    return res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(400).json({
      error: err?.message,
    });
  }
};

const getAllChat = async (_req, res) => {
  try {
    const chats = await ChatSchema.find({}).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      chats,
    });
  } catch (err) {
    res.status(400).json({
      error: err?.message,
    });
  }
};

const getAllChatOfUser = async (_req, res) => {
  try {
    const chats = await ChatSchema.find({}).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      chats,
    });
  } catch (err) {
    res.status(400).json({
      error: err?.message,
    });
  }
};

const createChat = async (req, res) => {
  const { chatName, createdUserId, users } = req.body;
  try {
    console.log(ChatSchema);
    const chat = await ChatSchema.find({
      chatName,
    });

    if (chat.length > 0) {
      res.status(400).json({ error: "Chat is exist" });
    } else {
      const result = await ChatSchema.create({
        chatName,
        createdUserId,
        messages: [],
        users,
      });
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(400).json({ error: err?.message });
  }
};

module.exports = {
  getChatById,
  getAllChat,
  createChat,
};
