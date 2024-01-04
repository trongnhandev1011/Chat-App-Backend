const mongoose = require("mongoose");
const { userSchema } = require("../models/user");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    createdUserId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
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
    type: [String],
    required: true,
  },
  messages: {
    type: [MessageSchema],
    required: true,
  },
});

const messageSchema = mongoose.model("MessageSchema", MessageSchema);
const chatSchema = mongoose.model("ChatSchema", ChatSchema);

module.exports = { MessageSchema: messageSchema, ChatSchema: chatSchema };
