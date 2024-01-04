const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const { getAllChat, getChatById, createChat } = require("../controllers/chat");

const router = express.Router();

router.get("/", authMiddleware, getAllChat);

router.get("/:id", authMiddleware, getChatById);

router.post("/", authMiddleware, createChat);

module.exports = router;
