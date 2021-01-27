import React from "react";
import { useState } from "react";

import ChartableMessageContainer from "../../ChartableMessage/ChartableMessageContainer";
import ChartViewMessage from "../ChartViewMessage/ChartViewMessage";
import BasicMessage from "./BasicMessage";

const BasicMessageContainer = ({ datum }) => {
  const [viewType, setViewType] = useState("default");

  const view = () => {
    switch (viewType) {
      case "line":
        return (
          <ChartViewMessage chartType="line" data={datum} dataType="record" />
        );
      case "bar":
        return (
          <ChartViewMessage chartType="bar" data={datum} dataType="record" />
        );
      case "pie":
        return (
          <ChartViewMessage chartType="pie" data={datum} dataType="record" />
        );
      case "doughnut":
        return (
          <ChartViewMessage
            chartType="doughnut"
            data={datum}
            dataType="record"
          />
        );
      default:
        const dataFirstKey = Object.keys(datum)[0];
        return <BasicMessage data={datum[dataFirstKey]} />;
    }
  };
  return (
    <ChartableMessageContainer viewType={viewType} setViewType={setViewType}>
      <div className="w-100">{view()}</div>
    </ChartableMessageContainer>
  );
};

export default BasicMessageContainer;
