const User = require("../models/User.js");
const errorHandler = require("../utils/error.js");
const bcryptjs = require("bcryptjs");
const updateUser = async (req, res, next) => {
  let userId = req.userId;

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.photo,
          phone: req.body.phone,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  let userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }
    const { password: pass, ...rest } = user._doc;
    //pass user details except the password
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const getUserByEmail = async (req, res, next) => {
  console.log('req',req);
  try {
    const user = await User.findOne({email: req.query.email});
    console.log("user is : ", user);
    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }
    const { password: pass, ...rest } = user._doc;
    // pass user details except the password
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = { updateUser, getUser, getUserByEmail };
