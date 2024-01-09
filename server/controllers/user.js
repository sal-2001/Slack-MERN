const User = require("../models/User.js");
const errorHandler = require("../utils/error.js");
const bcryptjs = require("bcryptjs");
const updateUser = async (req, res, next) => {
  // if (req.user.id !== req.params.id)
  //   return next(errorHandler(401, "You can only update your account"));

  // console.log("Request : ", req.cookies);
  // return;

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
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
  try {
    const user = await User.findById(req.params.id);
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
module.exports = { updateUser, getUser };
