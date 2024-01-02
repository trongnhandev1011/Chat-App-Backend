const express = require("express");
const { getAllChat, getChatById, createChat } = require("../controllers/chat");

const router = express.Router();

router.get("/", getAllChat);

router.get("/:id", getChatById);

router.post("/", createChat);

module.exports = router;
