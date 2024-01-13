import React, { useState } from "react";
import { getProfileName, getProfilePic } from "../utils/chat";
import useStateValue from "../context/AppContext";
import "../styles/namebar.css";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import CloseIcon from "@mui/icons-material/Close";
function Namebar({ chat }) {
  const [{ user }, dispatch] = useStateValue();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  if (!chat) return null;
  console.log("chat", chat);
  return (
    <div className="namebar">
      <img
        src={getProfilePic(chat, user)}
        alt="profile"
        className="namebar_img"
      />
      <p className="participantName">{getProfileName(chat, user)}</p>
      <MoreVertOutlinedIcon
        className="moreIcon"
        onClick={() => setShowMoreOptions(true)}
      />
      {showMoreOptions && (
        <div className="userOptionsContainer">
          <div
            className="closeIconContainer"
            onClick={() => setShowMoreOptions(false)}
          >
            <CloseIcon className="closeIcon" />
          </div>
          <img
            src={getProfilePic(chat, user)}
            alt="profile"
            className="userOptionImage"
          />
          <p className="chatName">{getProfileName(chat, user)}</p>
          <div className="groupMembers">
            {chat.isGroupChat &&
              chat?.users.map((user) => (
                <div className="groupMemberItem">
                  <img
                    src={user?.avatar}
                    alt="profile"
                    className="groupMembersImage"
                  />
                  <p className="groupMembersName">{user?.name}</p>
                  {user._id === chat?.groupAdmin?._id && <p className="groupAdmin">Admin</p>}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Namebar;
