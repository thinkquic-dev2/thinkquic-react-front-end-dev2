import React, { useContext } from "react";
import ChatInput from "../ChatInput/ChatInput";
import ChatMessageView from "../ChatMessage/ChatMessageView";
import ConversationList from "../ConvoList/ConversationList";
import "./ChatList.scss";
import { AppContext } from "../../../AppContext";

const ChatList = (props) => {
  const { isChatListVisible, toggleIsChatListVisible } = props;
  const { currentUser, conId } = useContext(AppContext);

  //console.log(conId);

  // const [state, setState] = useState({
  //   selectedConversation: userConversation,
  // });

  // const changeConversation = (conversation) => {
  //   setState({
  //     selectedConversation: conversation,
  //   });
  // };

  const convId = sessionStorage.getItem("convId");

  const chatUserListClass = isChatListVisible ? "chat-list chat-list--visible" : "chat-list";
  const closeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );

  return (
    <div className={chatUserListClass}>
      <div className="chat-list__header">
        <span className="chat-list__heading">Chat</span>
        <button className="chat-list__close-button" onClick={toggleIsChatListVisible}>
          {closeIcon}
        </button>
      </div>
      {currentUser ? (
        <>
          <ConversationList currUserId={currentUser.signInUserSession.idToken.payload.sub} />
          <ChatMessageView conversation={{ id: conId + "" }}></ChatMessageView>
          <ChatInput />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatList;
