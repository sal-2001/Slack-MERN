import React, { useEffect, useState } from "react";
import "../styles/chat.css";
import TopBar from "../components/TopBar";
import MessageContainer from "../components/MessageContainer";
import io from "socket.io-client";
import ChatList from "../components/ChatList";
import useStateValue from "../context/AppContext";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Chat() {
  // const navigate = useNavigate();
  const [{ user, isLoggedIn }, dispatch] = useStateValue();
  const [currChat, setCurrChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    let socketInstance = io(BASE_URL);
    setSocket(socketInstance);
  }, []);

  useEffect(() => {
    if (!socket || !isLoggedIn) return;
    console.log("going to emit setup");

    socket.emit("SETUP", user);

    socket.on("connection", () => {
      console.log("connection established");
      setSocketConnected(true);
    });
  }, [socket, isLoggedIn]);

  const selectChat = (chat) => {
    setCurrChat(chat);
  };

  return (
    <div className="chat_page">
      <div className="top">
        <TopBar />
      </div>
      <div className="main_section">
        <div className="side_bar">
          <ChatList selectChat={selectChat} />
        </div>
        <div className="message_section">
          <MessageContainer socket={socket} chat={currChat} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
