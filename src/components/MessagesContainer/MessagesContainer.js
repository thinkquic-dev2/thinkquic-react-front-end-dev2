import React, { useContext } from "react";
import { AppContext } from "../../AppContext";

import Message from "../Message/Message";

const MessagesContainer = () => {
  const { messages } = useContext(AppContext);
  return (
    <div className="messages-container">
      {messages.map((message, index) => {
        return <Message key={index} index={index} message={message} />;
      })}
    </div>
  );
};

export default MessagesContainer;
