const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
// const socketio = require("socket.io");
// const cors = require("cors");
const path = require("path");

const STATIC_FOLDER = "/";
const PORT = process.env.PORT || 8000;

dotenv.config();

// const registerRouter = require("./routes/registerRouter");
// const { socketController } = require("./controllers/socketController.js");

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

app.get("/", (req, res) => {
  res.send("API running successfully");
});

app.use(express.static(path.resolve(__dirname, STATIC_FOLDER)));

// app.use("/api", registerRouter);

server.listen(PORT, () => {
  console.log("Server listening on ", PORT);
});
