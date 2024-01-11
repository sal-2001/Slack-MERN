import React, { useEffect, useRef, useState } from "react";
import Participant from "./Participant";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import "../styles/chatlist.css";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import useStateValue from "../context/AppContext";
import { addUserToChat, createGroupChat, getUserChats } from "../services/chat";
import AddIcon from "@mui/icons-material/Add";
import { findUser } from "../services/user";
const groupFreshData = {
  chatName: "",
  users: [],
};
export default function ChatList({ selectChat }) {
  const fileRef = useRef(null);
  const [{ user }, dispatch] = useStateValue();
  const [userchats, setUserChats] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [addUserError, setAddUserError] = useState(null);
  const [groupName, setgroupName] = useState("");
  const [groupData, setGroupData] = useState(groupFreshData);
  const [groupUsers, setGroupUsers] = useState([]);
  useEffect(() => {
    if (user?._id) handleGetChats();
  }, [user?._id]);

  const handleGetChats = async () => {
    getUserChats(user?._id).then((data) => {
      console.log("data", data);
      setUserChats(data);
    });
  };
  const handleAddUser = async (e) => {
    e.preventDefault();
    findUser(userEmail)
      .then((data) => {
        if (data) {
          addUserToChat(data._id)
            .then(() => {
              console.log("successfully added user");
              setAddUser(false);
              setAddUserError(null);
              handleGetChats();
              setUserEmail("");
            })
            .catch((error) => console.log(error));
        } else {
          setAddUserError("User not found");
        }
      })
      .catch((error) => setAddUserError(error));
  };
  const handleAddUserToGroup = async (e) => {
    e.preventDefault();
    findUser(userEmail)
      .then((data) => {
        if (data) {
          setGroupUsers([...groupUsers, data.email]);
          setGroupData({
            ...groupData,
            users: [...groupData?.users, data._id],
          });
          setAddUserError(null);
          setUserEmail("");
          handleGetChats();
        } else {
          setAddUserError("User not found");
        }
      })
      .catch((error) => setAddUserError(error));
  };
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    createGroupChat({
      groupName,
      users: groupData?.users,
    })
      .then((data) => {
        console.log("group created successfully", data);
        setAddUser(false);
        setAddUserError(null);
        setgroupName("");
        setGroupUsers([]);
        setGroupData(groupFreshData);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="chatSection">
      <div className="chatListHeader">
        <div
          className={`chatType ${isChat ? "active" : ""}`}
          onClick={() => setIsChat(true)}
        >
          <PersonIcon className="headerIcon" />
          <p>Direct</p>
        </div>
        <div
          className={`chatType ${!isChat ? "active" : ""}`}
          onClick={() => setIsChat(false)}
        >
          <GroupsIcon className="headerIcon" />
          <p>Groups</p>
        </div>
      </div>
      <div className="chatList">
        {userchats &&
          userchats.length > 0 &&
          userchats.map((chat) => (
            <Participant key={chat._id} chat={chat} selectChat={selectChat} />
          ))}
      </div>
      <div className="addIconContainer" onClick={() => setAddUser(true)}>
        <AddIcon className="addIcon" />
      </div>
      {addUser &&
        (isChat ? (
          <form className="addUserContainer">
            <div
              className="closeIconContainer"
              onClick={() => setAddUser(false)}
            >
              <CloseIcon className="closeIcon" />
            </div>
            <label for="email" className="addUserLabel">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={userEmail}
              className="addUserInput"
              placeholder="Enter user email..."
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <button className="addUserButton" onClick={handleAddUser}>
              Add User
            </button>
            {addUserError && (
              <span className="addUserError">{addUserError}</span>
            )}
          </form>
        ) : (
          <form className="addUserContainer">
            <div
              className="closeIconContainer"
              onClick={() => setAddUser(false)}
            >
              <CloseIcon className="closeIcon" />
            </div>
            <input
              type="file"
              // onChange={(e) => setFile(e.target.files[0])}
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              src="https://res.cloudinary.com/dptno80n9/image/upload/v1704779893/slackmern/2352167_t2jyva.png"
              onClick={() => fileRef.current.click()}
              alt="profile pic"
              title="Edit group profile image"
              className="groupProfile"
            />
            <label for="groupname" className="addUserLabel">
              Group Name
            </label>
            <input
              type="text"
              id="groupname"
              className="addUserInput"
              placeholder="Enter group name..."
              onChange={(e) => setgroupName(e.target.value)}
            />
            <label for="email" className="addUserLabel">
              Email
            </label>
            <div className="groupEmailInput">
              <input
                type="email"
                id="email"
                value={userEmail}
                className="addUserInput"
                placeholder="Enter user email..."
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <AddCircleOutlinedIcon
                className="emailAddIcon"
                onClick={handleAddUserToGroup}
              />
            </div>
            <div className="groupUsersList">
              {groupUsers &&
                groupUsers?.length > 0 &&
                groupUsers?.map((email) => (
                  <p key={email} className="userListEmail">
                    {email}
                  </p>
                ))}
            </div>
            {addUserError && (
              <span className="addUserError">{addUserError}</span>
            )}
            <button className="addUserButton" onClick={handleCreateGroup}>
              Create Group
            </button>
          </form>
        ))}
    </div>
  );
}
