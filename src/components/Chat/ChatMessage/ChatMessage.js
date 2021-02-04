import React, { useContext } from "react";
import { AppContext } from "../../../AppContext";
import "./ChatMessage.scss";

const ChatMessage = (props) => {
  const timeString = props.message.createdAt
    ? new Date(props.message.createdAt).toLocaleTimeString()
    : new Date().toLocaleTimeString();
  console.log(props);
  return (
    <div className={`message_body ${props.isFromMe ? "me" : ""}`}>
      <p className="chatmessage">
        <span className="name">{props.senderName}</span>
        <span className="msgtext">{props.message.content}</span>
        <span className="timestamp">{timeString}</span>
      </p>
    </div>
  );
};

export default ChatMessage;
