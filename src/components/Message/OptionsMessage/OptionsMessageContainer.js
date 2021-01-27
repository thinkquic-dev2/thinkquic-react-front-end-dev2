import React from "react";
import { useState } from "react";

import "./OptionsMessage.scss";

const OptionsMessageContainer = ({ message }) => {
  const [selectedButton, setSelectedButton] = useState();

  const getButtons = (message) => {
    const buttonsInMessage = message.data.Buttons;
    let buttons = [];
    const buttonKeys = Object.keys(buttonsInMessage);
    for (let i = 0; i < buttonKeys.length; i++) {
      buttons.push(buttonsInMessage[buttonKeys[i]]);
    }
    return buttons;
  };

  const getText = (message) => {
    const textInMessage = message.data.Text;
    const textKeys = Object.keys(textInMessage);
    let texts = [];
    for (let i = 0; i < textKeys.length; i++) {
      texts.push(textInMessage[textKeys[i]]);
    }
    return texts;
  };

  return (
    <div className="options-message">
      <div className="options-message__texts">
        {getText(message).map((text, index) => {
          return (
            <div
              className="options-message__text"
              key={"options-message-text" + index}
            >
              {text}
            </div>
          );
        })}
      </div>
      <div className="options-message__options">
        {getButtons(message).map((button, index) => {
          let buttonClass =
            "btn btn-outline-primary mr-2 options-message__option";
          if (button === selectedButton) {
            buttonClass = "btn btn-success mr-2 options-message__option";
          }

          if (selectedButton && button !== selectedButton) {
            buttonClass =
              "btn btn-outline-primary mr-2 options-message__option options-message__option--disabled";
          }

          return (
            <button
              className={buttonClass}
              key={"options-message-option-" + index}
              onClick={() => {
                setSelectedButton(button);
              }}
            >
              {button}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionsMessageContainer;
