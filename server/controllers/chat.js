const Chat = require("../models/Chat");

const accessChat = async (req, res) => {
  console.log("reached controller");
  const { senderId, recieverId } = req.body;
  if (!recieverId || !senderId) {
    console.log("userId property not present");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: senderId } } },
      { users: { $elemMatch: { $eq: recieverId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "Sender",
      isGroupChat: false,
      users: [senderId, recieverId],
    };

    try {
      const newChatCreated = await Chat.create(chatData);
      const newChat = await Chat.findOne({ _id: newChatCreated._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(newChat);
    } catch (err) {
      console.log("something went wrong : ", err);
      res.status(err.status).send(err.message);
    }
  }
};

const fetchAllChats = async (req, res) => {
  console.log("reached controller fetchAllChats");
  const userId = req.query.userId;
  if (!userId) {
    console.log("userId property not present");
    return res.sendStatus(400);
  }

  try {
    let chatList = await Chat.find({
      users: { $elemMatch: { $eq: userId } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    return res.status(200).send(chatList);
  } catch (err) {
    console.log("something went wrong : ", err.message);
    return res.status(err.status).send(err.message);
  }
};

module.exports = { accessChat, fetchAllChats };
