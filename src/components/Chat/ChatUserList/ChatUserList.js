import React, { useEffect } from "react";
import { allUser } from "../../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import Users from "../Users";
import "./ChatUserList.scss";
import ChatMessage from "../ChatMessage/ChatMessage";

const ChatUserList = (props) => {
  const { isContactListVisible, toggleIsChatUserListVisible, username } = props;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await API.graphql(graphqlOperation(allUser));
        // console.log(users);
      } catch (e) {
        //console.log(e);
      }
    };
    fetchUsers();
  });

  const chatUserListClass = isContactListVisible
    ? "contact-list contact-list--visible"
    : "contact-list";
  const closeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );

  return (
    <div className={chatUserListClass}>
      <div className="contact-list__header">
        <span className="contact-list__heading">Contacts</span>
        <button
          className="contact-list__close-button"
          onClick={toggleIsChatUserListVisible}
        >
          {closeIcon}
        </button>
      </div>
      <Users username={username} />
    </div>
  );
};

export default ChatUserList;
