const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    provider: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = {
  userSchema,
  userModel: mongoose.model("User", userSchema),
};
