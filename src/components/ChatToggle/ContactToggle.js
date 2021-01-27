import React from "react";
import ChatUserList from "../Chat/ChatUserList/ChatUserList";

const ChatToggle = ({
  isContactListVisible,
  toggleIsChatUserListVisible,
  username,
}) => {
  return (
    <ChatUserList
      toggleIsChatUserListVisible={toggleIsChatUserListVisible}
      isContactListVisible={isContactListVisible}
      username={username}
    ></ChatUserList>
  );
};

export default ChatToggle;
