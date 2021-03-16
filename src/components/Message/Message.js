import React, { useEffect, useRef } from "react";

import MessageBubble from "../MessageBubble/MessageBubble";
import TextMessage from "./TextMessage/TextMessage";
import JsonMessageContainer from "./JsonMessage/JsonMessageContainer";

import { isMessageJson } from "../../utilities/jsonMessageHelper";

const Message = ({ message, isLast }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        if (ref.current) ref.current.scrollIntoView({ block: "end", behavior: "smooth" });
      }, 100);
    }
  }, []);

  const renderMessage = () => {
    if (isMessageJson(message.message)) {
      return <JsonMessageContainer message={message.message} />;
    } else {
      return <TextMessage message={message.message} />;
    }
  };

  const messageAdditionalClasses = isLast ? " message--last" : "";

  return (
    <div className={"message" + messageAdditionalClasses} ref={ref}>
      <MessageBubble from={message.from}>{renderMessage()}</MessageBubble>;
    </div>
  );
};

export default Message;
