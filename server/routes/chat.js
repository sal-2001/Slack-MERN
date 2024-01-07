const express = require("express");
const { accessChat, fetchAllChats } = require("../controllers/chat");
const router = express.Router();

router.post("/", accessChat);
router.get("/", fetchAllChats);
// router.post("/group", createGroupChat);
// router.put("/rename", renameGroup);
// router.post("/groupremove", removeFromGroup);
// router.post("/groupadd", addToGroup);

module.exports = router;
