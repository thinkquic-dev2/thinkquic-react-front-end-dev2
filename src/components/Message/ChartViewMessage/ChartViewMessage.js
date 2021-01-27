import React from "react";

import { Line, Doughnut, Bar, Pie } from "react-chartjs-2";

import useChartHelper from "../../../hooks/useChartHelper";

const ChartViewMessage = ({ data, dataType, chartType }) => {
  const {
    formatDataForChart,
    formatRecordDataForChart,
    formatTableDataForChart,
    formatBasicDataForChart,
    formatAggregationDataForChart,
  } = useChartHelper();

  let formattedData;

  switch (dataType) {
    case "record":
      formattedData = formatRecordDataForChart(data);
      break;
    case "table":
      formattedData = formatTableDataForChart(data);
      break;
    case "basic":
      console.log(data);
      formattedData = formatBasicDataForChart(data);
      break;
    case "aggregation":
      formattedData = formatAggregationDataForChart(data);
      break;
    default:
      formattedData = formatDataForChart(data);
      break;
  }

  switch (chartType) {
    case "line":
      return <Line data={formattedData} />;
    case "pie":
      return <Pie data={formattedData} />;
    case "doughnut":
      return <Doughnut data={formattedData} />;
    case "bar":
      return <Bar data={formattedData} />;
    default:
      return null;
  }
};

export default ChartViewMessage;
