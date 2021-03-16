import React, { useState } from "react";

import "./AggregationUi.scss";

import { Line, Doughnut, Bar, Pie } from "react-chartjs-2";

import ButtonIconTooltip from "../../ButtonIconTooltip/ButtonIconTooltip";

import AggregationUi from "./AggregationUi";

import { tableViewIcon, pieChartIcon, lineChartIcon, barChartIcon, doughnutChartIcon } from "../../../Icons/Icons";

const AggregationUiContainer = ({ aggregationData }) => {
  const [view, setView] = useState("default");

  const getAggregationType = (aggregationData) => {
    if (Array.isArray(aggregationData.stats)) {
      return "text";
    } else {
      return "non-text";
    }
  };

  const getAggregationDisplayData = (aggregationData) => {
    const getGrouping = () => {
      const aggregationDataKeys = Object.keys(aggregationData);
      for (let i = 0; i < aggregationDataKeys.length; i++) {
        if (aggregationDataKeys[i] !== "stats" && aggregationDataKeys[i] !== "stats_key") {
          return aggregationDataKeys[i];
        }
      }
      return null;
    };
    const heading = aggregationData.stats_key;
    const grouping = getGrouping();
    const arrayAggregationData = aggregationData.stats;
    return {
      heading,
      grouping,
      data: arrayAggregationData,
    };
  };

  const displayAggregationData = () => {
    const aggregationType = getAggregationType(aggregationData);
    let aggregationDisplayData = {
      aggregationType,
      ...getAggregationDisplayData(aggregationData),
    };
    return (
      <div>
        {displayHeading(aggregationDisplayData)}
        {displayView(aggregationDisplayData)}
      </div>
    );
  };

  const displayHeading = (aggregationDisplayData) => {
    return (
      <div className="aggregation-ui__headings">
        {aggregationDisplayData.grouping ? (
          <div className="aggregation-ui__data-grouping">{aggregationDisplayData.grouping}</div>
        ) : null}
        <div className="aggregation-ui__data-heading">{aggregationDisplayData.heading}</div>
      </div>
    );
  };

  const displayView = (aggregationDisplayData) => {
    const getLabels = (aggregationDisplayData) => {
      if (aggregationDisplayData.aggregationType === "text") {
        const labels = [];
        for (let i = 0; i < aggregationDisplayData.data.length; i++) {
          labels.push(aggregationDisplayData.data[i].key);
        }
        return labels;
      } else {
        return Object.keys(aggregationDisplayData.data);
      }
    };
    const getData = (aggregationDisplayData) => {
      const getDisplayValue = (fieldValue) => {
        let displayValue = "";

        if (!isNaN(fieldValue)) return fieldValue;
        if (fieldValue.includes("$")) {
          displayValue = fieldValue.replace("$", "").trim();
          return parseFloat(displayValue);
        }

        if (fieldValue.includes("sq ft")) {
          displayValue = fieldValue.replace("sq ft").trim();
          return parseFloat(displayValue);
        }

        if (fieldValue.includes("sq. ft.")) {
          displayValue = fieldValue.replace("sq. ft.").trim();
          return parseFloat(displayValue);
        }

        return fieldValue;
      };
      if (aggregationDisplayData.aggregationType === "text") {
        const data = [];
        for (let i = 0; i < aggregationDisplayData.data.length; i++) {
          data.push(aggregationDisplayData.data[i].doc_count);
        }
        return data;
      } else {
        const aggregationDisplayDataKeys = Object.keys(aggregationDisplayData.data);
        const data = [];
        for (let i = 0; i < aggregationDisplayDataKeys.length; i++) {
          data.push(getDisplayValue(aggregationDisplayData.data[aggregationDisplayDataKeys[i]]));
        }
        return data;
      }
    };
    const getDataset = (aggregationDisplayData) => {
      return {
        label: "Dataset 1",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
        data: getData(aggregationDisplayData),
      };
    };
    let options = {
      maintainAspectRation: false,
      responsive: true,
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.yLabel;
          },
        },
      },
    };
    switch (view) {
      case "line":
        const lineData = {
          labels: getLabels(aggregationDisplayData),
          datasets: [{ ...getDataset(aggregationDisplayData), backgroundColor: "rgb(255, 99, 132)" }],
        };
        return <Line data={lineData} options={options} />;
      case "bar":
        const barData = {
          labels: getLabels(aggregationDisplayData),
          datasets: [{ ...getDataset(aggregationDisplayData), backgroundColor: "rgb(255, 99, 132)" }],
        };
        return <Bar data={barData} options={options} />;
      case "pie":
        const pieData = {
          labels: getLabels(aggregationDisplayData),
          datasets: [getDataset(aggregationDisplayData)],
        };
        return <Pie data={pieData} />;
      case "doughnut":
        const doughnutData = {
          labels: getLabels(aggregationDisplayData),
          datasets: [getDataset(aggregationDisplayData)],
        };
        return <Doughnut data={doughnutData} />;
      default:
        return defaultAggregationView(aggregationDisplayData);
    }
  };

  const defaultAggregationView = (aggregationDisplayData) => {
    if (aggregationDisplayData.aggregationType === "text") {
      return (
        <div>
          <table className="table table--in-message">
            <thead>
              <tr>
                <th>{aggregationDisplayData.heading}</th>
                <th>{"doc_count"}</th>
              </tr>
            </thead>
            <tbody>
              {aggregationDisplayData.data.map((aggregationStat, index) => (
                <tr key={"aggregation-array-type-index" + index}>
                  <td>{aggregationStat.key}</td>
                  <td>{aggregationStat.doc_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      const aggregationStatsKeys = Object.keys(aggregationDisplayData.data);
      return (
        <div>
          <table className="table table--in-message">
            <tbody>
              {aggregationStatsKeys.map((aggregationStatKey, index) => (
                <tr key={"aggregation-stat-key-index-" + index}>
                  <th>{aggregationStatKey}</th>
                  <td>{aggregationData.stats[aggregationStatKey]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  const getAggregationViewOptions = () => {
    const aggregationOptionsArray = [
      {
        id: "default",
        text: "default view",
        icon: tableViewIcon,
        clickHandler: () => {
          setView("default");
        },
      },
      {
        id: "pie",
        text: "pie chart",
        icon: pieChartIcon,
        clickHandler: () => {
          setView("pie");
        },
      },
      {
        id: "line",
        text: "line chart",
        icon: lineChartIcon,
        clickHandler: () => {
          setView("line");
        },
      },
      {
        id: "bar",
        text: "bar chart",
        icon: barChartIcon,
        clickHandler: () => {
          setView("bar");
        },
      },
      {
        id: "doughnut",
        text: "doughnut chart",
        icon: doughnutChartIcon,
        clickHandler: () => {
          setView("doughnut");
        },
      },
    ];

    const options = aggregationOptionsArray.filter((aggregationOption) => aggregationOption.id !== view);

    const optionButtons = options.map((option, index) => (
      <ButtonIconTooltip
        key={"option-button-" + option.text}
        icon={option.icon}
        text={option.text}
        onClickHandler={option.clickHandler}
      />
    ));
    return optionButtons;
  };

  return <AggregationUi viewOptions={getAggregationViewOptions()} content={displayAggregationData()} />;
};

export default AggregationUiContainer;
