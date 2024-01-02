const mongoose = require("mongoose");

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
  createdUserId: {
    type: String,
    required: true,
  },
  secondUserId: {
    type: String,
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
