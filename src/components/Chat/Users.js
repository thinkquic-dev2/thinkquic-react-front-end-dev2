import React, { useContext, useEffect } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { AppContext } from "../../AppContext";
import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";
import { CreateConversation } from "../../mutationHelper";
import { allUser } from "../../graphql/queries";
import { Avatar } from "@material-ui/core";
import "./Users.scss";

const Users = (props) => {
  // static contextType = AppContext;

  const { setConId } = useContext(AppContext);
  let currUser = null;
  let allUsers = [];

  const createNewConversation = async (user) => {
    let convos = sessionStorage.getItem("convos");
    convos = convos ? JSON.parse(convos) : [];
    const verifyConversation = () => {
      //console.log(user.cognitoId, currUser?.cognitoId);
      for (let i = 0; i < convos.length; i++) {
        if (
          (convos[i].associated[0]?.userId === currUser?.cognitoId &&
            convos[i].associated[1]?.userId === user.cognitoId) ||
          (convos[i].associated[1]?.userId === currUser?.cognitoId &&
            convos[i].associated[0]?.userId === user.cognitoId)
        ) {
          // console.log("OK 1");
          return { status: true, cid: convos[i]?.conversationId };
        }
      }
      // console.log("OK 2");
      return { status: false };
    };
    let conversationExists = verifyConversation();
    // console.log(conversationExists);
    if (conversationExists.status) {
      sessionStorage.setItem("convId", conversationExists?.cid + "");
      setConId(conversationExists?.cid + "");
    } else {
      const conversationId = await CreateConversation(user, currUser);
      sessionStorage.setItem("convId", conversationId + "");
      setConId(conversationId + "");
    }
  };

  const { username } = props;

  return (
    <div>
      {/* <div className="section-header">
          <h6 className="mb-0">
            <i
              className="ion-ios-person"
              data-pack="default"
              data-tags="talk"
            />{" "}
            Users
          </h6>
        </div> */}
      <div className="user-list">
        <div className="list-group">
          <Connect
            query={graphqlOperation(queries.allUser)}
            subscription={graphqlOperation(subscriptions.subscribeToNewUsers)}
            onSubscriptionMsg={(prev, { subscribeToNewUsers }) => {
              prev.allUser.items.push(subscribeToNewUsers);
              return prev;
            }}
          >
            {({ data, loading, error }) => {
              let { allUser } = data || {
                allUser: [],
              };

              allUsers = allUser ? allUser : [];
              sessionStorage.setItem("allUsers", JSON.stringify(allUsers));

              if (error) return <h3>Error: {error}</h3>;
              if (loading || !allUsers) return <h3>Loading...</h3>;
              let validUsers = allUsers?.filter(
                (user) => user.username.toLowerCase() !== username.toLowerCase()
              );
              currUser = allUsers?.filter(
                (user) => user.username.toLowerCase() === username.toLowerCase()
              )[0];
              validUsers = validUsers ? validUsers : [];
              const noUsers = validUsers?.length === 0;
              if (noUsers) {
                return (
                  <div>
                    <br />
                    <div className="alert alert-success" role="alert">
                      It looks lonely here... Sign up another user
                    </div>
                  </div>
                );
              }
              return validUsers.map((user, i) => (
                <a
                  href="#"
                  key={i}
                  className="list-group-item list-group-item-action p-3 border-0"
                  onClick={() => createNewConversation(user)}
                >
                  {user.username}
                </a>
              ));
            }}
          </Connect>
        </div>
      </div>
    </div>
  );
};
export default Users;
