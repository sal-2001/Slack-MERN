import React from "react";
import "../styles/messageContainer.css";

function MessageBox({ chats }) {
  const myname = "shijith";

  return (
    <div className="messageBox">
      {chats ? (
        chats.map((msg, idx) => {
          return <Message msg={msg} myname={myname} />;
        })
      ) : (
        <p>You don't have any chats yet!</p>
      )}
    </div>
  );
}

export default MessageBox;

const Message = ({ msg, myname }) => {
  return (
    <div className={`message ${msg.sender === myname ? "my_message" : ""}`}>
      <p className="sender_name">{msg.sender}</p>
      <div className="message_content">{msg.message}</div>
    </div>
  );
};
