import React from "react";

import "./TimeoutPrompt.scss";

const TimeoutPrompt = ({ stayLoggedInHandler, signOutHandler, message }) => {
  return (
    <div className="timeout-prompt-container">
      <div className="timeout-prompt">
        <div className="timeout-prompt__message">{message}</div>
        <div className="timeout-prompt__options">
          <button className="timeout-prompt__option btn btn-primary" onClick={stayLoggedInHandler}>
            Stay logged in
          </button>
          <button className="timeout-prompt__option btn btn-outline-primary" onClick={signOutHandler}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeoutPrompt;
