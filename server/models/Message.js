const Mongoose = require("mongoose");

const MessageSchema = Mongoose.Schema(
  {
    sender: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Message", MessageSchema);
