const express = require("express");
const { sendMessage, fetchAllMessages } = require("../controllers/message");
const checkAuth = require("../middlewares/check-auth");
const router = express.Router();

router.post("/", checkAuth, sendMessage);
router.get("/:chatId", checkAuth, fetchAllMessages);

module.exports = router;
