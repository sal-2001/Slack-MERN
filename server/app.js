const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const path = require("path");
const logger = require("morgan");
const { instrument } = require("@socket.io/admin-ui");

const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");

dotenv.config();

const STATIC_FOLDER = "/";
const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL;
const ADMIN_SOCKETIO_UI = "https://admin.socket.io";

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
    origin: [CLIENT_URL, ADMIN_SOCKETIO_UI],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

instrument(io, {
  auth: false,
  mode: "development",
});

io.on("connection", (socket) => {
  console.log("someone connected");

  socket.on("SETUP", (userData) => {
    console.log("setting up : ", userData?.userId);
    socket.join(userData?.userId);
  });

  socket.on("NEW_MESSAGE_SENT", (message) => {
    console.log("NEW MESSAGE : ", message?.content);
    // socket.join(userData?.userId);
    socket.broadcast.emit("NEW_MESSAGE_RECIEVED", message);
  });
});
