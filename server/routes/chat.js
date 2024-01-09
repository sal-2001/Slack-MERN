const express = require("express");
const {
  accessChat,
  fetchAllChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chat");
const checkAuth = require("../middlewares/check-auth");
const router = express.Router();

router.post("/", checkAuth, accessChat);
router.get("/:id", checkAuth, fetchAllChats);
router.post("/group", checkAuth, createGroupChat);
router.put("/rename", checkAuth, renameGroup);
router.put("/groupadd", checkAuth, addToGroup);
router.put("/groupremove", checkAuth, removeFromGroup);

module.exports = router;
