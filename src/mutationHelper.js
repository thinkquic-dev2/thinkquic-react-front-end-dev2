import * as mutations from "./graphql/mutations";
import { graphqlOperation, Analytics, API } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

const assertErrors = (response) => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join("\n"));
  }
};

export const CreateUser = async (user) => {
  try {
    const response = await API.graphql(
      graphqlOperation(mutations.createUser, { user })
    );
    assertErrors(response);
    return response.data.CreateUser;
  } catch (e) {
    Analytics.record({
      name: "createUserError",
      attributes: {
        error: e.message,
      },
    });
  }
};

export const CreateConversation = async (user1, user2) => {
  try {
    const members = [user1.username, user2.username].sort();
    const conversationName = members.join(" and ");
    const conversationResponse = await API.graphql(
      graphqlOperation(mutations.createConversation, {
        name: conversationName,
        id: uuidv4(),
        createdAt: Date.now(),
      })
    );

    assertErrors(conversationResponse);
    const userConversation1Response = await API.graphql(
      graphqlOperation(mutations.createUserConversations, {
        userId: user1.cognitoId,
        conversationId: conversationResponse.data.createConversation.id,
      })
    );
    assertErrors(userConversation1Response);
    const userConversation2Response = await API.graphql(
      graphqlOperation(mutations.createUserConversations, {
        userId: user2.cognitoId,
        conversationId: conversationResponse.data.createConversation.id,
      })
    );
    assertErrors(userConversation2Response);
    return conversationResponse.data.createConversation.id;
  } catch (e) {
    Analytics.record({
      name: "createConversationError",
      attributes: {
        error: e.message,
      },
    });
  }
};

export const CreateMessage = async (message) => {
  try {
    const response = await API.graphql(
      graphqlOperation(mutations.createMessage, { ...message })
    );
    assertErrors(response);
    return response.data.CreateMessage;
  } catch (e) {
    Analytics.record({
      name: "createMessageError",
      attributes: {
        error: e.message,
      },
    });
  }
};
