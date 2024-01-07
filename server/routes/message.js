const express = require("express");
const { sendMessage, fetchAllMessages } = require("../controllers/message");
const router = express.Router();

router.post("/", sendMessage);
router.get("/:chatId", fetchAllMessages);

module.exports = router;
