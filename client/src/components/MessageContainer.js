import React, { useEffect, useState } from "react";
import "../styles/messageContainer.css";
import Namebar from "./Namebar";
import MessageBox from "./MessageBox";
import useStateValue from "../context/AppContext";

import InputBox from "./InputBox";
import { getAllMessages, sendMessage } from "../services/messages";

function MessageContainer({ socket, chat }) {
  const [{ user, isLoggedIn }, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket || !chat?._id) return;
    // Socketio event for joining a room
    socket.emit("JOIN_ROOM", chat?._id);
    populateChatHistory(chat?._id);
  }, [chat?._id]);

  useEffect(() => {
    if (!socket || !isLoggedIn) return;

    // Event handler for new messages recieved
    socket.on("NEW_MESSAGE_RECIEVED", (message) => {
      console.log("new message recieved : ", message);
      addMessageToChat(message);
    });
  }, [socket, isLoggedIn]);

  const populateChatHistory = async (chatId) => {
    console.log("poulating chat history of ", chatId);
    let messages = await getAllMessages(chatId);
    setMessages(messages);
  };

  // Sending a new message
  const sendMessageHandler = async (message) => {
    let newMessage = {
      content: message,
      sender: user?.userId,
      chat: chat?._id,
    };
    let msg = await sendMessage(newMessage);
    socket.emit("NEW_MESSAGE_SENT", msg);
    addMessageToChat(msg);
  };

  // Function for pushing message to the chat list
  const addMessageToChat = (message) => {
    setMessages((messages) => {
      return [...messages, message];
    });
  };

  return (
    <div className="message_container">
      <Namebar chat={chat} />
      <div className="message_box_container">
        <MessageBox messages={messages} />
      </div>
      <InputBox sendMessage={sendMessageHandler} />
    </div>
  );
}

export default MessageContainer;
