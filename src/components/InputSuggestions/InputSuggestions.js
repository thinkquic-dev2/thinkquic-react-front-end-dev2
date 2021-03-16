import React from "react";

import "./InputSuggestion.scss";

const InputSuggestions = ({ columnNames, userInput, setMessage, textInputRef }) => {
  const getLastWordOfInput = () => {
    const inputWordsArray = userInput.split(" ");
    const inputWordCount = inputWordsArray.length;
    const lastWordIndex = inputWordCount - 1;
    const lastWord = inputWordsArray[lastWordIndex];
    return lastWord;
  };

  const getInputWithLastWordRemoved = () => {
    let inputWithLastWordRemoved = "";
    const inputWordsArray = userInput.split(" ");
    for (let i = 0; i < inputWordsArray.length - 1; i++) {
      inputWithLastWordRemoved += inputWordsArray[i] + " ";
    }
    return inputWithLastWordRemoved.trim();
  };

  const shouldDisplayColumnName = (columnName) => {
    if (getLastWordOfInput() !== columnName) {
      return doesColumnStartWithInput(columnName, getLastWordOfInput());
    }
    return false;
  };

  const doesColumnStartWithInput = (columnName, lastWordOfInput) => {
    if (lastWordOfInput === "") {
      return true;
    }
    const lengthOfLastWordOfInput = lastWordOfInput.length;
    for (let i = 0; i < lengthOfLastWordOfInput; i++) {
      if (lastWordOfInput[i] !== columnName[i]) {
        return false;
      }
    }
    return true;
  };

  const inputSuggestionButtons = () => {
    if (!columnNames || userInput.split(" ").length < 2) {
      return null;
    }
    return columnNames.map((columnName, index) => {
      if (shouldDisplayColumnName(columnName)) {
        return (
          <button
            onClick={() => autoCompleteInput(columnName)}
            className="input-suggestions__suggestion"
            key={columnName + "-" + index}
          >
            {columnName}
          </button>
        );
      } else {
        return null;
      }
    });
  };

  const autoCompleteInput = (columnName) => {
    const inputWithLastWordRemoved = getInputWithLastWordRemoved();
    const autoCompleteInput = inputWithLastWordRemoved + " " + columnName;
    setMessage(autoCompleteInput);
    textInputRef.focus();
  };

  return <div className="input-suggestions">{inputSuggestionButtons()}</div>;
};

export default InputSuggestions;
