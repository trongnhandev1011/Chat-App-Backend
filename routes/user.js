const express = require("express");
const User = require("../models/user");
const { getUserById, getAllUser, createUser } = require("../controllers/user");

const router = express.Router();

router.post("/", createUser);

router.get("/", getAllUser);

router.get("/:id", getUserById);

module.exports = router;
