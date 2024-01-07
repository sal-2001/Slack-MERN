const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const socketio = require("socket.io");
// const cors = require("cors");
const path = require("path");
const logger = require("morgan");

const authRouter = require("./routes/auth");
// const userRouter = require("./routes/user.js");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");

const STATIC_FOLDER = "/";
const PORT = process.env.PORT || 8000;

dotenv.config();
const app = express();
const server = http.createServer(app);

// const io = socketio(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//     allowedHeaders: ["*"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("someone connected");
//   socketController(socket);
// });
app.use(cors());
app.use(express.static(path.resolve(__dirname, STATIC_FOLDER)));
app.use(express.json());
app.use(logger("dev"));

// app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => console.log(error));
server.listen(PORT, () => {
  console.log("Server listening on ", PORT);
});
