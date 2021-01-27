import React from "react";
import ChatList from "../Chat/ChatList/ChatList";

const ChatToggle = ({ isChatListVisible, toggleIsChatListVisible }) => {
  return (
    <ChatList
      toggleIsChatListVisible={toggleIsChatListVisible}
      isChatListVisible={isChatListVisible}
    ></ChatList>
  );
};

export default ChatToggle;
