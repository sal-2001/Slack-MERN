import React, { useEffect, useState } from "react";
import Participant from "./Participant";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import "../styles/chatsection.css";
import useStateValue from "../context/AppContext";
import { getUserChats } from "../services/chat";
export default function ChatSection() {
  const [{ user }, dispatch] = useStateValue();
  const [userchats, setUserChats] = useState([]);
  // useEffect(()=>{
  //   if(userchats.length===0)
  //   {
  //     handleGetChats();
  //   }
  // },[]);
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
        {/* {
          userchats && userchats.length > 0 && userchats.map((chat)=>(
            <Participant key={chat._id} chat={chat}/>
          )
          )
        } */}
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
      </div>
    </div>
  );
}
