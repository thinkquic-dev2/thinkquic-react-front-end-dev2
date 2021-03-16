import React from "react";

const AggregationUi = ({ viewOptions, content }) => {
  return (
    <div className="aggregation-ui">
      <div className="aggregation-ui__options">{viewOptions}</div>
      <div className="aggregation-ui__content">{content}</div>
    </div>
  );
};

export default AggregationUi;
