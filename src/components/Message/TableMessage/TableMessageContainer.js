import React from "react";

import ChartableMessageContainer from "../../ChartableMessage/ChartableMessageContainer";

import TableMessage from "./TableMessage";
import ChartViewMessage from "../ChartViewMessage/ChartViewMessage";
import { useState } from "react";

const TableMessageContainer = ({ message }) => {
  const [viewType, setViewType] = useState("default");

  const [fieldToVisualize, setFieldToVisualize] = useState();

  const getTableFields = (message) => {
    const fields = Object.keys(message.data[0]);
    return fields;
  };

  const tableFields = getTableFields(message);

  const updatedMessage = (message, fieldToVisualize) => {
    let messageToVisualize;

    let updatedMessageData = [];

    for (let i = 0; i < message.data.length; i++) {
      updatedMessageData.push({
        [fieldToVisualize]: message.data[i][fieldToVisualize],
      });
    }

    messageToVisualize = { ...message, data: updatedMessageData };

    return messageToVisualize;
  };

  const view = () => {
    console.log(updatedMessage(message, fieldToVisualize));
    switch (viewType) {
      case "line":
        return fieldToVisualize ? (
          <ChartViewMessage
            chartType="line"
            message={updatedMessage(message, fieldToVisualize)}
          />
        ) : null;
      case "bar":
        return fieldToVisualize ? (
          <ChartViewMessage
            chartType="bar"
            message={updatedMessage(message, fieldToVisualize)}
          />
        ) : null;
      case "pie":
        return fieldToVisualize ? (
          <ChartViewMessage
            chartType="pie"
            message={updatedMessage(message, fieldToVisualize)}
          />
        ) : null;
      case "doughnut":
        return fieldToVisualize ? (
          <ChartViewMessage
            chartType="doughnut"
            message={updatedMessage(message, fieldToVisualize)}
          />
        ) : null;
      default:
        return <TableMessage message={message} />;
    }
  };

  const fieldSelection =
    viewType === "default" ? null : (
      <div>
        {fieldToVisualize ? null : <p>Please select a field</p>}
        {tableFields.map((field, index) => {
          let buttonClass = "btn btn-outline-primary mr-2";
          if (fieldToVisualize === field) {
            buttonClass = "btn btn-primary mr-2";
          }
          return (
            <button
              className={buttonClass}
              onClick={() => setFieldToVisualize(field)}
              key={"field-selection-" + index}
            >
              {field}
            </button>
          );
        })}
      </div>
    );

  return (
    <ChartableMessageContainer viewType={viewType} setViewType={setViewType}>
      <div>
        <div>{fieldSelection}</div>
        {view()}
      </div>
    </ChartableMessageContainer>
  );
};

export default TableMessageContainer;
