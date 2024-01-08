import React, { useEffect, useRef } from "react";
import "../styles/messageContainer.css";
import useStateValue from "../context/AppContext";

function MessageBox({ chats }) {
  const [{ user }, _] = useStateValue();
  const messageBox = useRef(null);

  useEffect(() => {
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  }, [chats]);

  return (
    <div className="message_box" ref={messageBox}>
      {chats ? (
        chats.map((msg, idx) => {
          return <Message message={msg} currUserId={user?.userId} key={idx} />;
        })
      ) : (
        <p>You don't have any chats yet!</p>
      )}
    </div>
  );
}

export default MessageBox;

const Message = ({ message, currUserId }) => {
  return (
    <div
      className={`message ${
        message.sender.userId === currUserId ? "my_message" : ""
      }`}
    >
      <p className="sender_name">{message.sender.name}</p>
      <div className="message_content">{message.content}</div>
    </div>
  );
};
