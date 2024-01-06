require("dotenv").config();
const { Server } = require("socket.io");
const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("node:http");
const cors = require("cors");
const chatRoutes = require("./routes/chat");
const userRoutes = require("./routes/user");
const { saveChatMessage } = require("./controllers/chat");

const app = express();
const server = createServer(app);

// middleware
app.use(express.json());
app.use(cors());

// socket
const io = new Server(server, {
  path: "/socket",
  cors: {
    origin: true, // Essentially { origin: req.url }
  },
});

io.on("connection", (socket) => {
  socket.on("messages", async ({ message, userId, chatId }) => {
    const result = await saveChatMessage({ message, userId, chatId });

    if (result) {
      io.to(chatId).emit("messages", result);
    }
  });

  socket.on("join_chat_room", ({ userId, chatId }) => {
    socket.join(chatId);
  });
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//routes
app.use("/api/chat", chatRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => console.log("hello"))
  .catch((err) => console.log(err));

//port
server.listen("4000", () => {
  // console.log(1234);
});

app.get("/", (req, res) => {
  // res.json({ msg: "hello" });
});

module.exports = { io };
