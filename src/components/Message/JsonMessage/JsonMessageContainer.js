import React, { useContext } from "react";

import AggregationUiContainer from "../AggregationUi/AggregationUiContainer";
import DataUiContainer from "../DataUi/DataUiContainer";

import JsonMessage from "./JsonMessage";

import { AppContext } from "../../../AppContext";

import {
  getFlattendedAggregationData,
  getDecomposedJsonMessage,
  mergeDataItemsIntoTable,
} from "../../../utilities/jsonMessageHelper";

const JsonMessageContainer = (props) => {
  const { messages, setMessages } = useContext(AppContext);

  const { aggregations, data, buttons, texts } = getDecomposedJsonMessage(props.message);

  const getAggregationsUi = (aggregations) => {
    const flattenedAggregationData = getFlattendedAggregationData(aggregations);
    return flattenedAggregationData.map((aggregation, index) => (
      <AggregationUiContainer aggregationData={aggregation} key={index} />
    ));
  };

  const getDataUi = (data) => {
    if (data.length < 1) {
      return null;
    }
    return <DataUiContainer data={mergeDataItemsIntoTable(data)} />;
  };

  const getButtonsUi = (buttons) => {
    return (
      <div
        className="buttons position-relative"
        style={{ marginRight: "-.5rem", marginLeft: "-.5rem", paddingRight: ".5rem", paddingLeft: ".5rem" }}
      >
        <div className="overlay overlay--buttons"></div>
        {buttons.map((button, index) => {
          const buttonFirstKey = Object.keys(button);
          return (
            <button
              onClick={() => {
                setMessages([...messages, { from: "user", message: button[buttonFirstKey].value }]);
              }}
              key={index}
              className="btn btn-success mx-1 mb-2"
            >
              {button[buttonFirstKey].key}
            </button>
          );
        })}
      </div>
    );
  };

  const getTextsUi = (texts) => {
    return (
      <div
        className="py-4 position-relative"
        style={{ marginRight: "-.5rem", marginLeft: "-.5rem", paddingRight: ".5rem", paddingLeft: ".5rem" }}
      >
        <div className="overlay overlay--texts"></div>
        {texts.map((text, index) => {
          const textFirstKey = Object.keys(text);
          return <div key={index}>{text[textFirstKey].value}</div>;
        })}
      </div>
    );
  };

  return (
    <JsonMessage
      aggregations={getAggregationsUi(aggregations)}
      data={getDataUi(data)}
      buttons={getButtonsUi(buttons)}
      texts={getTextsUi(texts)}
    />
  );
};

export default JsonMessageContainer;
