import React, { useContext, useEffect } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { Scrollbars } from "react-custom-scrollbars";
import * as queries from "../../../graphql/queries";
import * as subscriptions from "../../../graphql/subscriptions";
import "./ChatMessageView.scss";
import ChatMessage from "./ChatMessage";
import { AppContext } from "../../../AppContext";

const ChatMessageView = (props) => {
  //const contextType = AuthContext;
  const { currentUser } = useContext(AppContext);

  const scrollbarsRef = React.createRef();

  const getSenderName = (message) => {
    let sname = "";
    let allUsers = sessionStorage.getItem("allUsers");
    allUsers = allUsers ? JSON.parse(allUsers) : [];
    const suser = allUsers.filter((us) => us.id === message?.sender)[0];
    sname = suser?.username;
    console.log(sname, suser);
    return sname;
  };

  //const username = this.context ? this.context.username : null;
  return (
    <div className="chat-message-view">
      {/* <div className="chat-message-view-header">
          {this.props.conversation
            ? this.props.conversation.name
            : "Select a conversation"}
        </div> */}
      <div className="chat">
        {props.conversation ? (
          <div className="msgview">
            <Connect
              query={graphqlOperation(queries.allMessageConnection, {
                conversationId: props.conversation.id,
              })}
              subscription={graphqlOperation(
                subscriptions.subscribeToNewMessage,
                {
                  conversationId: props.conversation.id,
                }
              )}
              onSubscriptionMsg={(prev, { subscribeToNewMessage }) => {
                try {
                  prev.allMessageConnection.messages.push(
                    subscribeToNewMessage
                  );
                } catch (e) {
                  console.log("Failed to merge user conversation subscription");
                }
                return prev;
              }}
            >
              {({ data, loading, error }) => {
                let { allMessageConnection: getConvo } = data || {
                  allMessageConnection: [],
                };
                //console.log(data);
                getConvo = getConvo ? getConvo : [];
                if (error) return <h3>Error: {error}</h3>;
                let messages;
                try {
                  messages = getConvo.messages;
                } catch (e) {
                  messages = [];
                }
                // console.log(getConvo);
                if (loading || !messages) return <h3>Loading...</h3>;
                console.log(messages);
                return (
                  <>
                    {messages.map((message, i) => (
                      <ChatMessage
                        key={i}
                        message={message}
                        senderName={getSenderName(message)}
                        isFromMe={
                          message.sender ===
                          currentUser.signInUserSession.idToken.payload.sub
                        }
                      />
                    ))}
                  </>
                );
              }}
            </Connect>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatMessageView;
