import { LinearProgress } from "@material-ui/core";
import React, { useContext } from "react";
import { AppContext } from "../../AppContext";

import Message from "../Message/Message";

const MessagesContainer = () => {
  const { messages, isWaiting } = useContext(AppContext);
  const isLast = (index) => {
    return index + 1 === messages.length ? true : false;
  };
  return (
    <div className="messages-container">
      {messages.map((message, index) => {
        return <Message isLast={isLast(index)} key={index} index={index} message={message} />;
      })}
      {/* {isWaiting ? (
        <div className="progress_load">
          <LinearProgress />
        </div>
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default MessagesContainer;
