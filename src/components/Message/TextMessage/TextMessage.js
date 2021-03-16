import React from "react";

const TextMessage = ({ message }) => {
  return (
    <div
      className="position-relative"
      style={{ marginRight: "-.5rem", marginLeft: "-.5rem", paddingRight: ".5rem", paddingLeft: ".5rem" }}
    >
      <div className="overlay"></div>
      {message}
    </div>
  );
};

export default TextMessage;
