const Mongoose = require("mongoose");

const UserSchema = Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dptno80n9/image/upload/v1704610214/slackmern/ProfileIcon_dmcba9.jpg",
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("User", UserSchema);
