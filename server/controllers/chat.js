const Chat = require("../models/Chat");

const accessChat = async (req, res, next) => {
  console.log("reached controller");
  let senderId = req.userId;
  const { recieverId } = req.body;
  if (!recieverId || !senderId) {
    console.log("userId property not present");
    return next(errorHandler(400, "userId property not present"));
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
    res.json(isChat[0]);
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
      res.status(200).json(newChat);
    } catch (err) {
      console.log("something went wrong : ", err);
      next(err);
    }
  }
};

const fetchAllChats = async (req, res, next) => {
  console.log("reached controller fetchAllChats");
  const userId = req.userId;
  if (!userId) {
    console.log("userId property not present");
    return next(errorHandler(400, "userId property not present"));
  }

  try {
    let chatList = await Chat.find({
      users: { $elemMatch: { $eq: userId } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json(chatList);
  } catch (err) {
    console.log("something went wrong : ", err.message);
    next(err);
  }
};

const createGroupChat = async (req, res, next) => {
  console.log("reached controller for createGroupChat");
  let userId = req.userId;
  const { users, groupName } = req.body;
  if (!users?.length || !groupName) {
    console.log("All fields are not filled");
    return next(errorHandler(400, "Please fill all the fields"));
  }

  if (users?.length < 2) {
    console.log("less than 2 participants");
    return next(errorHandler(400, "A group require more than 2 members"));
  }

  users.push(userId);

  try {
    let groupChat = await Chat.create({
      chatName: groupName,
      isGroupChat: true,
      users: users,
      groupAdmin: userId,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json(fullGroupChat);
  } catch (err) {
    next(err);
  }
};

const renameGroup = async (req, res, next) => {
  const { chatId, chatName } = req.body;
  if (!chatId || !chatName) {
    console.log("Chat Id or chat name not present");
    return next(errorHandler(400, "ChatId or new chatname is missing"));
  }

  try {
    let updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return next(errorHandler(404, "Chat group not found"));
    }

    return res.status(200).json(updatedChat);
  } catch (err) {
    console.log("something went wrong : ", err.message);
    next(err);
  }
};

const addToGroup = async (req, res, next) => {
  let userId = req.userId;
  const { chatId } = req.body;
  if (!chatId || !userId) {
    console.log("Chat Id or chat name not present");
    return next(errorHandler(400, "ChatId or new chatname is missing"));
  }

  try {
    let updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $addToSet: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return next(errorHandler(404, "Chat group not found"));
    }

    return res.status(200).json(updatedChat);
  } catch (err) {
    console.log("something went wrong : ", err.message);
    next(err);
  }
};

const removeFromGroup = async (req, res, next) => {
  console.log("reached controller for removeFromGroup");
  let userId = req.userId;
  const { chatId } = req.body;
  console.log("removing ", userId);
  if (!chatId || !userId) {
    console.log("Chat Id or chat name not present");
    return next(errorHandler(400, "ChatId or new chatname is missing"));
  }

  try {
    let updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return next(errorHandler(404, "Chat group not found"));
    }

    return res.status(200).json(updatedChat);
  } catch (err) {
    console.log("something went wrong : ", err.message);
    next(err);
  }
};

module.exports = {
  accessChat,
  fetchAllChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
