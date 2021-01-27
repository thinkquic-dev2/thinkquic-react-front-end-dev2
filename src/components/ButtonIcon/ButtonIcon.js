import React from "react";

import "./ButtonIcon.scss";

const ButtonIcon = ({ onClickHandler, svgIcon }) => {
  return (
    <button
      className="button-icon"
      onClick={() => {
        onClickHandler();
      }}
    >
      {svgIcon}
    </button>
  );
};

export default ButtonIcon;
