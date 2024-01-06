const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const {
  getAllChat,
  getChatById,
  createChat,
  getChatMessage,
} = require("../controllers/chat");

const router = express.Router();

router.get("/", authMiddleware, getAllChat);

router.get("/:id", authMiddleware, getChatById);

router.get("/:id/messages", getChatMessage);

router.post("/", authMiddleware, createChat);

module.exports = router;
