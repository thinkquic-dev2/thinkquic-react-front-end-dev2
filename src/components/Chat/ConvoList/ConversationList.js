import React, { useContext } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import * as queries from "../../../graphql/queries";
import * as subscriptions from "../../../graphql/subscriptions";
import "./ConversationList.scss";
import { AppContext } from "../../../AppContext";

const ConversationList = (props) => {
  const { currentUser, conId, setConId } = useContext(AppContext);
  const { currUserId } = props;

  const getReceiverName = (convname) => {
    let [user1, user2] = convname.split(" and ");
    if (user1.toLowerCase() !== currentUser.username.toLowerCase()) return user1;
    if (user2.toLowerCase() !== currentUser.username.toLowerCase()) return user2;
  };

  const setConversationId = (cid) => {
    sessionStorage.setItem("convId", cid + "");
    setConId(cid);
  };

  return (
    <div className="convo-list">
      <div className="list-group">
        {currUserId ? (
          <Connect
            query={graphqlOperation(queries.getUserConversationConnectionThroughUser)}
            subscription={graphqlOperation(subscriptions.subscribeToNewUCs, {
              userId: currUserId,
            })}
            onSubscriptionMsg={(prev, { subscribeToNewUCs }) => {
              try {
                //console.log(prev, subscribeToNewUCs);
                prev.me.conversations.userConversations.push(subscribeToNewUCs);
              } catch (e) {
                console.log("Failed to merge user conversation subscription");
              }
              return prev;
            }}
          >
            {({ data, loading, error }) => {
              const { me: getUser } = data || {
                conversations: [],
              };

              if (error) return <h3>Error: {error}</h3>;
              let userConversations;
              try {
                userConversations = getUser?.conversations.userConversations;
              } catch (e) {
                userConversations = [];
              }
              if (loading || !userConversations) return <h3>Loading...</h3>;
              // console.log(userConversations);
              const associatedConvs = userConversations.map(({ associated, conversationId }) => ({
                associated,
                conversationId,
              }));
              sessionStorage.setItem("convos", JSON.stringify(associatedConvs));

              return userConversations.map((userC, i) => (
                <div
                  className={`convItem ${conId === userC.conversationId ? "active" : ""}`}
                  onClick={(e) => {
                    setConversationId(userC.conversationId);
                  }}
                  key={i}
                >
                  {getReceiverName(userC.conversation.name)}
                </div>
              ));
            }}
          </Connect>
        ) : null}
      </div>
    </div>
  );
};

export default ConversationList;
