const { MessageSchema, ChatSchema } = require("../models/chat");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const getChatById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await ChatSchema.findById(id);
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: err?.message,
    });
  }
};

const getChatMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const page = req.query?.page || 1;
    const pageNumber = req.query?.pageNumber || 10;

    // const messages = await ChatSchema.aggregate([
    //   { $match: { _id: new mongoose.Types.ObjectId(id) } },
    //   { $unwind: "$messages" },
    //   {
    //     $lookup: {
    //       from: "users", // Replace with your actual users collection name
    //       localField: "messages.createdUserId",
    //       foreignField: "_id",
    //       as: "user",
    //     },
    //   },
    //   {
    //     $addFields: {
    //       "messages.user": { $arrayElemAt: ["$user", 0] },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       messages: {
    //         $push: "$messages",
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       messages: {
    //         $slice: ["$messages", (page - 1) * pageNumber, pageNumber],
    //       },
    //     },
    //   },
    //   {
    //     $set: {
    //       messages: {
    //         $sortArray: {
    //           input: "$messages",
    //           sortBy: { "messages.createdAt": -1 },
    //         },
    //       },
    //     },
    //   },
    // ]);

    const messages = await MessageSchema.find({
      chatId: id,
    })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "createdUserId",
        options: { as: "user" },
      })
      .skip((page - 1) * pageNumber, pageNumber)
      .limit(pageNumber);

    return res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({
      error: err?.message,
    });
  }
};

const getAllChat = async (_req, res) => {
  const user = _req.user;

  try {
    const chats = await ChatSchema.find({
      users: user.id,
    }).sort({
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

const getAllChatRoomOfUser = async (_req, res) => {
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
    const chat = await ChatSchema.find({
      chatName,
    });

    if (chat.length > 0) {
      res.status(400).json({ error: "Chat is exist" });
    } else {
      const result = await ChatSchema.create({
        chatName,
        createdUserId,
        users,
      });
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(400).json({ error: err?.message });
  }
};

const saveChatMessage = async ({ message, userId, chatId }) => {
  try {
    const result = await MessageSchema.create({
      createdUserId: userId,
      content: message,
      chatId,
    });

    const populatedMessage = await MessageSchema.findById(result._id).populate(
      "createdUserId"
    );

    return populatedMessage;
  } catch (err) {}
};

module.exports = {
  getChatById,
  getAllChat,
  createChat,
  saveChatMessage,
  getChatMessage,
};
