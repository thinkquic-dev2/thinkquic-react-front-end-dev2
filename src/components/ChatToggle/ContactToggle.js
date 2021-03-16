import React from "react";
import ChatUserList from "../Chat/ChatUserList/ChatUserList";

const ContactToggle = ({ isContactListVisible, toggleIsChatUserListVisible, username, toggleIsChatListVisible }) => {
  return (
    <ChatUserList
      toggleIsChatUserListVisible={toggleIsChatUserListVisible}
      isContactListVisible={isContactListVisible}
      username={username}
      toggleIsChatListVisible={toggleIsChatListVisible}
    ></ChatUserList>
  );
};

export default ContactToggle;
