import React from "react";

const ButtonIconLink = ({ clickHandler, icon, text }) => {
  return (
    <button
      className="btn btn-link text-white d-flex align-items-center"
      onClick={clickHandler}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default ButtonIconLink;
