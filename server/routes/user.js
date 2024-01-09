const express = require("express");
const {
  updateUser,
  getUser,
  getUserByEmail,
} = require("../controllers/user.js");
// const { verifyToken } = require("../utils/verifyUser.js");
const router = express.Router();

router.post("/update/:id", updateUser);
router.get("/get/:id", getUser);
router.get("/getdetails", getUserByEmail);
module.exports = router;
