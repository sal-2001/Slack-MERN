const User = require("../models/User.js");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, phone });

  try {
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = newUser._doc;

    res.cookie("access_token", token).status(200).json(rest);
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    } else {
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(401, "Wrong credentials!"));
      } else {
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET );
        const { password: pass, ...rest } = validUser._doc;
        res.cookie("access_token", token, { httpOnly: false, secure: false, expire: new Date(Date.now()) + 7 * 24 * 60 * 60, path: '/chat' }).status(200).json(rest);

        // res.cookie("access_token", token, {httpOnly: true, secure: false, expire: new Date(Date.now()) + 7 * 24 * 60 * 60}).status(200).json(rest);
      }
    }
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      // console.log('rest',rest);
      res.cookie("access_token", token);

      console.log("cookies are : ", res.cookie());

      return res.status(200).json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      // console.log("token", token);
      res.cookie("access_token", token);

      console.log("cookies are : ", res.cookie());

      return res.status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, google };
