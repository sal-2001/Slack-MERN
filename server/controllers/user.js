const User = require("../models/User");
const errorHandler = require("../utils/error");
const bcryptjs = require("bcryptjs");
const updateUser = async (req, res, next) => {
  // if (req.user.id !== req.params.id)
  //   return next(errorHandler(401, "You can only update your account"));

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

module.exports = { updateUser };
