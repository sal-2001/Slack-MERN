import React from "react";
import { getProfileName, getProfilePic } from "../utils/chat";
import useStateValue from "../context/AppContext";
import "../styles/namebar.css";

function Namebar({ chat }) {
  const [{ user }, dispatch] = useStateValue();
  if (!chat) return null;
  return (
    <div className="namebar">
      <img
        src={getProfilePic(chat, user)}
        alt="profile"
        className="namebar_img"
      />
      <p className="participantName">{getProfileName(chat, user)}</p>
    </div>
  );
}

export default Namebar;
