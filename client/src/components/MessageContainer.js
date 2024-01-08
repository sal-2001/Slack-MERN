import React, { useEffect, useState } from "react";
import "../styles/messageContainer.css";
import Namebar from "./Namebar";
import MessageBox from "./MessageBox";
import useStateValue from "../context/AppContext";

import InputBox from "./InputBox";

function MessageContainer({ socket, chatId }) {
  const [{ user, isLoggedIn }, dispatch] = useStateValue();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!socket || !chatId) return;
    // Socketio event for joining a room
    socket.emit("JOIN_ROOM", chatId);
  }, [chatId]);

  useEffect(() => {
    if (!socket || !isLoggedIn) return;

    // Event handler for new messages recieved
    socket.on("NEW_MESSAGE_RECIEVED", (message) => {
      console.log("new message recieved : ", message);
      addMessageToChat(message);
    });
  }, [socket, isLoggedIn]);

  // Sending a new message
  const sendMessage = (message) => {
    let newMessage = {
      content: message,
      sender: user,
      chatId: chatId,
    };
    socket.emit("NEW_MESSAGE_SENT", newMessage);
    addMessageToChat(newMessage);
  };

  // Function for pushing message to the chat list
  const addMessageToChat = (message) => {
    setChats((chats) => {
      return [...chats, message];
    });
  };

  return (
    <div className="message_container">
      <div className="nameBar">
        <Namebar />
      </div>
      <div className="message_box_container">
        <MessageBox chats={chats} />
      </div>
      <InputBox sendMessage={sendMessage} />
    </div>
  );
}

export default MessageContainer;
