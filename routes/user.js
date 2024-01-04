const express = require("express");
const {
  getUserById,
  getAllUser,
  createUser,
  getMyProfile,
} = require("../controllers/user");
const { authMiddleware } = require("../middlewares/auth");

const router = express.Router();

router.post("/", authMiddleware, createUser);

router.get("/", authMiddleware, getAllUser);

router.get("/me", authMiddleware, getMyProfile);

router.get("/:id", authMiddleware, getUserById);

module.exports = router;
