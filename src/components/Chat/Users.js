import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import AuthContext from "../../AuthContext";
import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";
import { CreateConversation } from "../../mutationHelper";
import { allUser } from "../../graphql/queries";
import { Avatar } from "@material-ui/core";
import "./Users.scss";

class Users extends Component {
  static contextType = AuthContext;
  render() {
    const { username } = this.props;

    console.log(this);

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
                let { allUser: allUsers } = data || {
                  allUser: [],
                };
                allUsers = allUsers ? allUsers : [];

                if (error) return <h3>Error: {error}</h3>;
                if (loading || !allUsers) return <h3>Loading...</h3>;

                let validUsers = allUsers?.filter(
                  (user) => user.username !== username
                );
                console.log(validUsers);
                validUsers = validUsers ? validUsers : [];
                const noUsers = validUsers?.length === 0;
                if (noUsers) {
                  console.log(allUsers);
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
                    onClick={() => this.createNewConversation(user)}
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
  }

  createNewConversation = async (user) => {
    await CreateConversation(user.username, this.context.username);
  };
}

export default Users;
