const express = require("express");
const http = require("http");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => console.log(error));

const userRouter = require("./routes/user.js");
const authRouter = require("./routes/auth.js");
// const socketio = require("socket.io");
// const cors = require("cors");
const path = require("path");
const { error } = require("console");

const STATIC_FOLDER = "/";
// const registerRouter = require("./routes/registerRouter");
// const { socketController } = require("./controllers/socketController.js");

const PORT = 8000;

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
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
server.listen(PORT, () => {
  console.log("Server listening on ", PORT);
});
