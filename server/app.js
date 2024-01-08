const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.js");
const chatRoutes = require("./routes/chat.js");
const messageRoutes = require("./routes/message.js");

dotenv.config();

const STATIC_FOLDER = "/";
const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, STATIC_FOLDER)));
app.use(express.json());
app.use(logger("dev"));

// app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
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

// Connecting MongoDB database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => console.log(error));

// Running the server
const server = app.listen(PORT, () => {
  console.log("Server listening on ", PORT);
});
// Initiating web socket connection
const io = socketio(server, {
  pingTimeout: 600000,
  cors: {
    origin: [CLIENT_URL],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("someone connected");
  // socketController(socket);
});
