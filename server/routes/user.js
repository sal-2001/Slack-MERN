const express = require("express");
const {
  updateUser,
  getUser,
  getUserByEmail,
} = require("../controllers/user.js");
const checkAuth = require("../middlewares/check-auth.js");
const router = express.Router();

router.post("/update/", checkAuth, updateUser);
router.get("/", checkAuth, getUser);
router.get("/getdetails", checkAuth, getUserByEmail);
module.exports = router;
