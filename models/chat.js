const mongoose = require("mongoose");
const { userSchema } = require("../models/user");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    createdUserId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    chatId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "ChatSchema",
    },
  },
  {
    timestamps: true,
  }
);

const ChatSchema = new Schema({
  chatName: {
    type: String,
    required: true,
  },
  users: {
    type: [mongoose.Schema.ObjectId],
    required: true,
  },
});

const messageSchema = mongoose.model("MessageSchema", MessageSchema);
const chatSchema = mongoose.model("ChatSchema", ChatSchema);

module.exports = { MessageSchema: messageSchema, ChatSchema: chatSchema };
