const Mongoose = require("mongoose");

const ChatSchema = Mongoose.Schema(
  {
    chatName: {
      type: String,
      required: true,
      trim: true,
    },
    profile: {
      type: String,
      default:
        "https://res.cloudinary.com/dptno80n9/image/upload/v1704610214/slackmern/ProfileIcon_dmcba9.jpg",
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Chat", ChatSchema);
