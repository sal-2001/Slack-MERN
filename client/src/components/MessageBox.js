import React, { useEffect, useRef } from "react";
import "../styles/messageContainer.css";
import useStateValue from "../context/AppContext";

function MessageBox({ messages }) {
  const [{ user }, _] = useStateValue();
  const messageBox = useRef(null);

  useEffect(() => {
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  }, [messages]);

  return (
    <div className="message_box" ref={messageBox}>
      {messages ? (
        messages.map((msg, idx) => {
          return <Message message={msg} currUserId={user?._id} key={idx} />;
        })
      ) : (
        <p>You don't have any messages yet!</p>
      )}
    </div>
  );
}

export default MessageBox;

const Message = ({ message, currUserId }) => {
  return (
    <div
      className={`message ${
        message.sender._id === currUserId ? "my_message" : ""
      }`}
    >
      <p className="sender_name">{message.sender.name}</p>
      <div className="message_content">{message.content}</div>
    </div>
  );
};
