const express = require("express");
const {
  getUserById,
  getAllUser,
  createUser,
  getMyProfile,
} = require("../controllers/user");

const router = express.Router();

router.post("/", createUser);

router.get("/", getAllUser);

router.get("/me", getMyProfile);

router.get("/:id", getUserById);

module.exports = router;
