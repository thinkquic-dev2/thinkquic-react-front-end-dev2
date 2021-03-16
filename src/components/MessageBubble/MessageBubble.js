import React from "react";

import "./MessageBubble.scss";

const MessageBubble = (props) => {
  const { children, from } = props;
  const messageBubbleClasses =
    from === "app" ? "message-bubble message-bubble--app" : "message-bubble message-bubble--user";
  return <div className={messageBubbleClasses}>{children}</div>;
};

export default MessageBubble;
