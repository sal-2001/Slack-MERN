import React from "react";
import "../styles/participant.css";
import useStateValue from "../context/AppContext";
import { getProfileName, getProfilePic, getShortTime } from "../utils/chat";

export default function Participant({ chat, selectChat }) {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="participantContainer" onClick={() => selectChat(chat)}>
      <img
        src={getProfilePic(chat, user)}
        alt="profile"
        className="participantImg"
      />
      <p className="participantName">{getProfileName(chat, user)}</p>
      <p className="messageTime">{getShortTime(chat?.updatedAt)}</p>
    </div>
  );
}
