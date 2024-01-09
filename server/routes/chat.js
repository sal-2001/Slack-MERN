const express = require("express");
const {
  accessChat,
  fetchAllChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chat");
const router = express.Router();

router.post("/", accessChat);
router.get("/:id", fetchAllChats);
router.post("/group", createGroupChat);
router.put("/rename", renameGroup);
router.put("/groupadd", addToGroup);
router.put("/groupremove", removeFromGroup);

module.exports = router;