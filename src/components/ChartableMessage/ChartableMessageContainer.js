import React from "react";
import "./ChartableMessage.scss";

import ChartableMessageOption from "./ChartableMessageOption";

const ChartableMessageContainer = (props) => {
  const { children, viewType, setViewType } = props;

  const barChartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
    </svg>
  );

  const pieChartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z" />
    </svg>
  );

  const lineChartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
    </svg>
  );

  const doughnutChartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z" />
    </svg>
  );

  const tableViewIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z" />
    </svg>
  );

  const onSelectPieChart = () => {
    setViewType("pie");
  };
  const onSelectLineChart = () => {
    setViewType("line");
  };
  const onSelectDoughnutChart = () => {
    setViewType("doughnut");
  };
  const onSelectBarChart = () => {
    setViewType("bar");
  };

  return (
    <div className="chartable-message">
      <div className="chartable-message__options">
        {viewType !== "default" ? (
          <ChartableMessageOption
            icon={tableViewIcon}
            text={"default view"}
            onClickHandler={() => {
              setViewType("default");
            }}
          />
        ) : null}

        {viewType !== "pie" ? (
          <ChartableMessageOption
            icon={pieChartIcon}
            text={"pie chart"}
            onClickHandler={() => {
              onSelectPieChart();
            }}
          />
        ) : null}

        {viewType !== "line" ? (
          <ChartableMessageOption
            icon={lineChartIcon}
            text={"line chart"}
            onClickHandler={() => {
              onSelectLineChart();
            }}
          />
        ) : null}

        {viewType !== "bar" ? (
          <ChartableMessageOption
            icon={barChartIcon}
            text={"bar chart"}
            onClickHandler={() => {
              onSelectBarChart();
            }}
          />
        ) : null}

        {viewType !== "doughnut" ? (
          <ChartableMessageOption
            icon={doughnutChartIcon}
            text={"doughnut chart"}
            onClickHandler={() => {
              onSelectDoughnutChart();
            }}
          />
        ) : null}
      </div>
      {children}
    </div>
  );
};
export default ChartableMessageContainer;
