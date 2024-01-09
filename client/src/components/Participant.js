import React from "react";
import "../styles/participant.css";
import useStateValue from "../context/AppContext";

export default function Participant({ chat }) {
  const [{ user: currUser }, dispatch] = useStateValue();

  const getShortTime = (time) => {
    return new Date(time).toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const getProfileName = (chat) => {
    let otherUserProfile = null;

    if (!chat?.isGroupChat) {
      let otherUser = chat?.users?.find(
        (user) => user?._id !== currUser?.userId
      );
      otherUserProfile = otherUser?.name;
    }
    return otherUserProfile || chat?.chatName;
  };
  const getProfilePic = (chat) => {
    let otherUserProfile = null;
    
    if (!chat?.isGroupChat) {
      let otherUser = chat?.users?.find(
        (user) => user?._id !== currUser?.userId
      );
      otherUserProfile = otherUser?.avatar;
    }
    return otherUserProfile || chat?.profile;
  };
  return (
    <div className="participantContainer">
      <img src={getProfilePic(chat)} alt="profile" className="participantImg" />
      <p className="participantName">{getProfileName(chat)}</p>
      <p className="messageTime">{getShortTime(chat?.updatedAt)}</p>
    </div>
  );
}
