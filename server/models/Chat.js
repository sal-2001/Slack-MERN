const Mongoose = require("mongoose");

const ChatSchema = Mongoose.Schema(
  {
    chatName: {
      type: String,
      required: true,
      trim: true,
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
