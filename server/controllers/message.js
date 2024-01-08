const Message = require("../models/Message");
const errorHandler = require("../utils/error");

const sendMessage = async (req, res, next) => {
  const { sender, content, chat } = req.body;

  if (!sender || !content || !chat) {
    return next(errorHandler(400, "Invalid request"));
  }

  let message = {
    sender: sender,
    content: content,
    chat: chat,
  };

  try {
    let newMessage = await Message.create(message);
    const fullNewMessage = await Message.findOne({
      _id: newMessage._id,
    })
      .populate("sender", "-password")
      .populate("chat");

    return res.status(200).json(fullNewMessage);
  } catch (err) {
    console.log("something went wrong : ", err);
    next(err);
  }
};

const fetchAllMessages = async (req, res, next) => {
  const chatId = req.params.chatId;
  if (!chatId) {
    return next(errorHandler(400, "Invalid request"));
  }

  try {
    let chatList = await Message.find({ chat: chatId })
      .populate("sender", "-password")
      .populate("chat");

    return res.status(200).json(chatList);
  } catch (err) {
    console.log("something went wrong : ", err);
    next(err);
  }
};

module.exports = { sendMessage, fetchAllMessages };
