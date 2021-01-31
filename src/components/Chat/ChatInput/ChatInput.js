import React, { Component } from "react";
import AuthContext from "../../../AuthContext";
import { CreateMessage } from "../../../mutationHelper";
import "./ChatInput.scss";

class ChatInput extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  render() {
    const username = this.context ? this.context.username : null;
    return (
      <div className="chat-input">
        <div className="input-group">
          <input
            type="text"
            className="form-control no-focus"
            required
            placeholder="Type a Message"
            value={this.state.text}
            onKeyUp={this.onKeyUp}
            onChange={(e, t) => {
              this.setState({ text: e.target.value });
            }}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-dark"
              onClick={this.createNewMessage}
              type="button"
            >
              Send&nbsp;<i className="ion-chatbubble-working"></i>
            </button>
          </span>
        </div>
      </div>
    );
  }

  createNewMessage = async () => {
    const username = this.context.username;
    console.log({ username });
    await CreateMessage({
      content: this.state.text,
      sender: this.props.senderId,
      authorId: username,
      // ConversationId: this.props.conversation.id,
    });
    this.setState({ text: "" });
  };

  onKeyUp = (e) => {
    // enter
    if (e.keyCode === 13) {
      this.createNewMessage();
    }
  };
}

export default ChatInput;
