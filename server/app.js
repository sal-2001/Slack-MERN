const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const socketio = require("socket.io");
// const cors = require("cors");
const path = require("path");
const logger = require("morgan");

const STATIC_FOLDER = "/";
const PORT = process.env.PORT || 8000;

dotenv.config();

const chatRoutes = require("./routes/chat");

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
app.use(express.static(path.resolve(__dirname, STATIC_FOLDER)));
app.use(express.json());

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("API running successfully");
});

app.use("/api/chat", chatRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => console.log(error));

server.listen(PORT, () => {
  console.log("Server listening on ", PORT);
});
