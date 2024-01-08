import React, { useState } from "react";
import sentIcon from "../assets/sent_icon.png";

function InputBox({ sendMessage }) {
  const [newMsg, setNewMsg] = useState("");
  const send = () => {
    if (!newMsg) return;
    sendMessage(newMsg);
    setNewMsg("");
  };

  const enterSend = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };

  const handleInput = (e) => {
    setNewMsg(e.target.value);
  };
  return (
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
  );
}

export default InputBox;
