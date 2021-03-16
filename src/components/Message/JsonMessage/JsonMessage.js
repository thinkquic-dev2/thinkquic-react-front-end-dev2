import React from "react";

const JsonMessage = ({ aggregations, data, buttons, texts }) => {
  return (
    <div>
      {aggregations}
      {data}
      {texts}
      {buttons}
    </div>
  );
};

export default JsonMessage;
