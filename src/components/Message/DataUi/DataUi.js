import React, { useState } from "react";

import { Line, Doughnut, Bar, Pie } from "react-chartjs-2";

import "./DataUi.scss";

import SelectItems from "./SelectItems/SelectItems";

const DataUi = ({ data }) => {
  const [chartType, setChartType] = useState();
  const [xAxis, setXaxis] = useState([]);
  const [yAxis, setYaxis] = useState([]);
  const [fieldsToChart, setFieldsToChart] = useState([]);
  const [view, setView] = useState("table");

  const getDataName = () => {
    const dataKey = Object.keys(data)[0];
    return dataKey;
  };

  const getFields = () => {
    const dataFields = Object.keys(data[getDataName()]);
    return dataFields;
  };

  const getRandomColor = () => {
    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const colors = [
      "rgba(255, 99, 132, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(255, 205, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(201, 203, 207, 1)",
    ];
    return colors[randomInteger(0, 5)];
  };

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

  const tableView = () => {
    return (
      <table className="w-100">
        <tbody>
          {getFields().map((field, index) => (
            <tr key={field + "-" + index}>
              <th>{field}</th>
              <td>{data[getDataName()][field]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const chartTypeButtonHandler = (chartType) => {
    setFieldsToChart([]);
    setYaxis([]);
    setXaxis([]);
    setChartType(chartType);
  };

  const selectAxisOrField = (chartType) => {
    if (chartType === "Bar" || chartType === "Line") {
      return (
        <>
          <SelectItems
            label={"Fields for x-axis:"}
            items={getFields()}
            itemsFilter={[...xAxis, ...yAxis]}
            selectedItems={xAxis}
            setSelectedItems={setXaxis}
          />
          <SelectItems
            label={"Fields for y-axis:"}
            items={getFields()}
            itemsFilter={[...xAxis, ...yAxis]}
            selectedItems={yAxis}
            setSelectedItems={setYaxis}
          />
        </>
      );
    } else if (chartType === "Doughnut" || chartType === "Pie") {
      return (
        <SelectItems
          label={"Fields:"}
          items={getFields()}
          itemsFilter={[...fieldsToChart]}
          selectedItems={fieldsToChart}
          setSelectedItems={setFieldsToChart}
        />
      );
    } else {
      return null;
    }
  };

  const selectChartType = () => {
    const selected = "btn btn-primary mx-1 mb-2";
    const unselected = "btn btn-outline-primary mx-1 mb-2";
    return (
      <div>
        <div className="py-2">Select Chart type:</div>
        <button
          className={chartType === "Pie" ? selected : unselected}
          onClick={() => chartTypeButtonHandler("Pie")}
        >
          Pie
        </button>
        <button
          className={chartType === "Doughnut" ? selected : unselected}
          onClick={() => chartTypeButtonHandler("Doughnut")}
        >
          Doughnut
        </button>
        <button
          className={chartType === "Bar" ? selected : unselected}
          onClick={() => chartTypeButtonHandler("Bar")}
        >
          Bar
        </button>
        <button
          className={chartType === "Line" ? selected : unselected}
          onClick={() => chartTypeButtonHandler("Line")}
        >
          Line
        </button>
      </div>
    );
  };

  const fieldToIncludeButtonHander = (fieldToInclude) => {
    if (fieldsToChart.includes(fieldToInclude)) {
      setFieldsToChart(
        fieldsToChart.filter((fieldToChart) => fieldToChart !== fieldToInclude)
      );
    } else {
      setFieldsToChart([...fieldsToChart, fieldToInclude]);
    }
  };

  const getStepSize = (highestValue) => {
    let stepSize = highestValue / 10;
    return stepSize;
  };

  const getHighestValue = (data) => {
    let highestValue = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i] > highestValue && !isNaN(data[i])) {
        highestValue = data[i];
      }
    }
    return highestValue;
  };

  const chart = () => {
    if (chartType === "Pie" && fieldsToChart.length > 0) {
      let labels = [];
      let datasets = [];
      let localData = [];
      let pieData = {};
      for (let i = 0; i < fieldsToChart.length; i++) {
        localData.push(getDisplayValue(data[getDataName()][fieldsToChart[i]]));
      }
      labels = [...fieldsToChart];
      datasets.push({
        label: "Dataset 1",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
        data: localData,
      });
      pieData = {
        labels,
        datasets,
      };
      return <Pie data={pieData} />;
    }

    if (chartType === "Doughnut" && fieldsToChart.length > 0) {
      let labels = [];
      let datasets = [];
      let localData = [];
      let doughnutData = {};
      for (let i = 0; i < fieldsToChart.length; i++) {
        localData.push(getDisplayValue(data[getDataName()][fieldsToChart[i]]));
      }
      labels = [...fieldsToChart];
      datasets.push({
        label: "Dataset 1",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
        data: localData,
      });
      doughnutData = {
        labels,
        datasets,
      };
      return <Doughnut data={doughnutData} />;
    }

    if (chartType === "Line" && xAxis.length > 0) {
      let labels = [];
      let datasets = [];
      let localData = [];
      let lineData = {};

      for (let i = 0; i < xAxis.length; i++) {
        labels.push(xAxis[i]);
        localData.push(getDisplayValue(data[getDataName()][xAxis[i]]));
      }

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
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                callback: function (value) {
                  if (value % 1 === 0) {
                    return value;
                  }
                },
              },
            },
          ],
        },
      };

      datasets.push({
        label: "Dataset 1",
        borderColor: getRandomColor(),
        borderWidth: 1,
        data: localData,
      });

      lineData = {
        labels,
        datasets,
      };

      return <Line options={options} data={lineData} />;
    }

    if (chartType === "Bar" && xAxis.length > 0) {
      let labels = [];
      let datasets = [];
      let localData = [];
      let barData = {};
      let backgroundColors = [];

      for (let i = 0; i < xAxis.length; i++) {
        labels.push(xAxis[i]);
        localData.push(getDisplayValue(data[getDataName()][xAxis[i]]));
        backgroundColors.push(getRandomColor());
      }

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
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                callback: function (value) {
                  if (value % 1 === 0) {
                    return value;
                  }
                },
              },
            },
          ],
        },
      };

      datasets.push({
        label: "Dataset 1",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: [],
        borderWidth: 1,
        data: localData,
        backgroundColor: backgroundColors,
      });

      barData = {
        labels,
        datasets,
      };
      return <Bar data={barData} options={options} />;
    }

    return null;
  };

  const chartView = () => {
    return (
      <>
        {selectChartType()}
        {selectAxisOrField(chartType)}
        <div className="data-ui__chart-container">{chart()}</div>
      </>
    );
  };

  const viewButtonHandler = () => {
    if (view === "chart") {
      setChartType(null);
      setFieldsToChart([]);
      setXaxis([]);
      setYaxis([]);
      setView("table");
    } else {
      setChartType(null);
      setFieldsToChart([]);
      setXaxis([]);
      setYaxis([]);
      setView("chart");
    }
  };

  const viewButton =
    view === "table" ? (
      <button className="btn btn-outline-info mx-3" onClick={viewButtonHandler}>
        Chart
      </button>
    ) : (
      <button className="btn btn-outline-info mx-3" onClick={viewButtonHandler}>
        Table
      </button>
    );

  return (
    <div className="data-ui">
      <div className="data-ui__name">{getDataName()}</div>
      <div className="data-ui__options">
        <span className="data-ui__options-label">Toggle View: </span>
        {viewButton}
      </div>
      <div className="data-ui__content">
        {view === "table" ? tableView() : chartView()}
      </div>
    </div>
  );
};

export default DataUi;
