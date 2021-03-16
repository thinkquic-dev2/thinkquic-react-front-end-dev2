import React from "react";

import "./OptionsList.scss";

import { checkIcon } from "../../Icons/Icons";

const OptionsList = ({ title, options, setOption, selectedOptionValue }) => {
  const optionClickHandler = (optionValue) => {
    setOption(optionValue);
  };
  return (
    <div className="options-list">
      <div className="options-list__title">{title}</div>
      <div className="options-list__options">
        {options.map((option, index) => {
          return (
            <button
              className="options-list__option"
              key={title + "-options" + index}
              onClick={() => optionClickHandler(option.value)}
            >
              {option.name}
              {selectedOptionValue === option.value ? checkIcon : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionsList;
