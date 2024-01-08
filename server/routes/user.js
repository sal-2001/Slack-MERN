const express = require("express");
const { updateUser, getUser } = require("../controllers/user.js");
// const { verifyToken } = require("../utils/verifyUser.js");
const router = express.Router();

router.post("/update/:id", updateUser);
router.get("/get/:id", getUser);
module.exports = router;
