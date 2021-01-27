import React, { useState } from "react";

import ChartViewMessage from "../ChartViewMessage/ChartViewMessage";
import ChartableMessageContainer from "../../ChartableMessage/ChartableMessageContainer";
import AggregationMessage from "./AggregationMessage";

const AggregationMessageContainer = ({ aggregationData }) => {
  const [viewType, setViewType] = useState("default");
  const view = () => {
    switch (viewType) {
      case "line":
        return (
          <ChartViewMessage
            chartType="line"
            dataType="aggregation"
            data={aggregationData}
          />
        );
      case "bar":
        return (
          <ChartViewMessage
            chartType="bar"
            dataType="aggregation"
            data={aggregationData}
          />
        );
      case "pie":
        return (
          <ChartViewMessage
            chartType="pie"
            dataType="aggregation"
            data={aggregationData}
          />
        );
      case "doughnut":
        return (
          <ChartViewMessage
            chartType="doughnut"
            dataType="aggregation"
            data={aggregationData}
          />
        );
      default:
        return <AggregationMessage aggregationData={aggregationData} />;
    }
  };
  return (
    <ChartableMessageContainer viewType={viewType} setViewType={setViewType}>
      <div className="w-100">{view()}</div>
    </ChartableMessageContainer>
  );
};

export default AggregationMessageContainer;
