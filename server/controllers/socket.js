const socketIOController = (socket) => {
  socket.on("SETUP", (userData) => {
    console.log("setting up : ", userData?.userId);
    socket.join(userData?.userId);
  });

  socket.on("JOIN_ROOM", (roomId) => {
    console.log("Joining room : ", roomId);
    socket.join(roomId);
  });

  socket.on("NEW_MESSAGE_SENT", (message) => {
    console.log("NEW MESSAGE : ", message);
    socket.to(message?.chatId).emit("NEW_MESSAGE_RECIEVED", message);
  });
};

module.exports = socketIOController;
