import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/chat.css";
import TopBar from "../components/TopBar";
import MessageContainer from "../components/MessageContainer";
import io from "socket.io-client";
import ChatSection from "../components/ChatSection";
import useStateValue from "../context/AppContext";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Chat() {
  // const navigate = useNavigate();
  const [{ user, isLoggedIn }, dispatch] = useStateValue();
  const [chats, setChats] = useState([]);
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

    socket.on("NEW_MESSAGE_RECIEVED", (message) => {
      console.log("new message recieved : ", message);
      addMessageToChat(message);
    });
  }, [socket, isLoggedIn]);

  const sendMessage = (message) => {
    let newMessage = {
      content: message,
      sender: user,
    };
    socket.emit("NEW_MESSAGE_SENT", newMessage);
    addMessageToChat(newMessage);
  };

  // FUnction for pushing message to the chat list
  const addMessageToChat = (message) => {
    setChats((chats) => {
      return [...chats, message];
    });
  };

  return (
    <div className="chat_page">
      <div className="top">
        <TopBar />
      </div>
      <div className="main_section">
        <div className="side_bar">
          <ChatSection />
        </div>
        <div className="message_section">
          <MessageContainer chats={chats} sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
