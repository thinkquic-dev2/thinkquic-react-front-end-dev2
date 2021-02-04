import React, { useContext, useState } from "react";
import AuthContext from "../../../AuthContext";
import { CreateMessage } from "../../../mutationHelper";
import { CreateConversation } from "../../../mutationHelper";
import { v4 as uuidv4 } from "uuid";
import "./ChatInput.scss";
import { AppContext } from "../../../AppContext";
import useCognito from "../../../hooks/useCognito";

const ChatInput = (props) => {
  //static contextType = AuthContext;

  const [state, setState] = useState({ text: "" });
  // constructor(props)
  //   super(props);
  //   this.state = {
  //     text: "",
  //   };
  // }
  // const username = this.context ? this.context.username : null;
  const { currentUser } = useContext(AppContext);
  const createNewMessage = async () => {
    const conversationId = sessionStorage.getItem("convId");
    console.log(conversationId);
    await CreateMessage({
      content: state.text,
      conversationId: conversationId,
      createdAt: new Date().toString(),
      id: uuidv4(),
      isSent: true,
      sender: currentUser.signInUserSession.idToken.payload.sub,
    });
    console.log(state.text);
    setState({ text: "" });
  };

  const onKeyUp = (e) => {
    // enter
    if (e.keyCode === 13) {
      createNewMessage();
    }
  };
  return (
    <div className="chat-input">
      <div className="input-group">
        <input
          type="text"
          className="form-control no-focus"
          required
          placeholder="Type a Message"
          value={state.text}
          onKeyUp={onKeyUp}
          onChange={(e, t) => {
            setState({ text: e.target.value });
          }}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-dark"
            onClick={createNewMessage}
            type="button"
          >
            Send&nbsp;<i className="ion-chatbubble-working"></i>
          </button>
        </span>
      </div>
    </div>
  );
};

export default ChatInput;
