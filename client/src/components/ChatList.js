import React, { useEffect, useState } from "react";
import Participant from "./Participant";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import "../styles/chatlist.css";
import useStateValue from "../context/AppContext";
import { getUserChats } from "../services/chat";
export default function ChatList() {
  const [{ user }, dispatch] = useStateValue();
  const [userchats, setUserChats] = useState([]);

  useEffect(() => {
    if (user?.userId) handleGetChats();
  }, [user?.userId]);

  const handleGetChats = async () => {
    getUserChats(user.userId).then((data) => {
      console.log("data", data);
      setUserChats(data);
    });
  };
  return (
    <div className="chatSection">
      <div className="chatListHeader">
        <div className="chatType active">
          <PersonIcon className="headerIcon" />
          <p>Chats</p>
        </div>
        <div className="chatType">
          <GroupsIcon className="headerIcon" />
          <p>Groups</p>
        </div>
      </div>
      <div className="chatList">
        {userchats &&
          userchats.length > 0 &&
          userchats.map((chat) => <Participant key={chat._id} chat={chat} />)}
      </div>
    </div>
  );
}
