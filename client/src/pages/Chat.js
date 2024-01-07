import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/chat.css";
import TopBar from "../components/TopBar";
import MessageContainer from "../components/MessageContainer";

function Chat({ socket }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // const username = localStorage.getItem("username");
    // if (!username) navigate("/");
    // setName(username);
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to backend");
      if (!name) return;
      socket.emit("joined-user", name);
    });

    socket.on("message", (message) => {
      console.log("recieved a message");
      // const messageContainer = document.querySelector(".message__container");
      // messageContainer.innerHTML += `<div>${message}</div>`;
      let newChat = chats;
      chats.push(message);
      setChats(newChat);
    });
  }, [name]);

  const sendMessage = (message) => {
    socket.emit("message", { message: message });
    let msgs = chats;
    msgs.push({ message, sender: "shijith" });
    console.log("messages", msgs);
    setChats(msgs);
  };

  return (
    <div className="chat_page">
      <div className="top">
        <TopBar />
      </div>
      <div className="main_section">
        <div className="side_bar">{/* Component goes here */}</div>
        <div className="message_container">
          <MessageContainer chats={chats} sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
