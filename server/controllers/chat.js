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

module.exports = { accessChat };
