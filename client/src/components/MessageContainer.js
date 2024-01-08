import React, { useState } from "react";
import "../styles/messageContainer.css";
import Namebar from "./Namebar";
import MessageBox from "./MessageBox";
import sentIcon from "../assets/sent_icon.png";

function MessageContainer({ chats, sendMessage }) {
  const [newMsg, setNewMsg] = useState("");
  const send = () => {
    if (!newMsg) return;
    sendMessage(newMsg);
    setNewMsg("");
  };

  const enterSend = (e) => {
    if (e.key === "Enter") {
      console.log(e.key);
      e.preventDefault();
      send();
    }
  };

  const handleInput = (e) => {
    setNewMsg(e.target.value);
  };

  console.log("msg : ", newMsg);
  return (
    <div className="message_container">
      <div className="nameBar">
        <Namebar />
      </div>
      <div className="message_box_container">
        <MessageBox chats={chats} />
      </div>
      <div className="inputBox">
        <input
          type="text"
          placeholder="Enter text message"
          name="message"
          value={newMsg}
          id="message"
          autoComplete="off"
          onKeyDown={enterSend}
          onChange={handleInput}
        />
        <button className="send_btn" onClick={send}>
          <img src={sentIcon} alt="Send" />
        </button>
      </div>
    </div>
  );
}

export default MessageContainer;
