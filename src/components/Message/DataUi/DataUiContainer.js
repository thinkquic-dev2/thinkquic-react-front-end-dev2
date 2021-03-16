import React, { useEffect, useState } from "react";

import { Line, Doughnut, Bar, Pie } from "react-chartjs-2";

import "./DataUi.scss";

import SelectItems from "./SelectItems/SelectItems";

import DataUi from "./DataUi";

import { getButtonsFromMessage } from "../../../utilities/jsonMessageHelper";

const DataUiContainer = ({ data }) => {
  const [chartType, setChartType] = useState();
  const [xAxis, setXaxis] = useState([]);
  const [yAxis, setYaxis] = useState([]);
  const [xAxisType, setXaxisType] = useState("any");
  const [yAxisAggregationType, setYaxisAggregationType] = useState([]);
  const [fieldsToChart, setFieldsToChart] = useState([]);
  const [view, setView] = useState("table");

  const getDataName = () => {
    const dataKey = "Data";
    return dataKey;
  };

  const getFields = () => {
    const dataFields = Object.keys(data[0]);
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
      <div className="in-message-table-container">
        <table className="table table--in-message w-100">
          <thead>
            <tr>
              {getFields().map((field, index) => (
                <th key={"data-heading-" + index}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((datum, index) => (
              <tr key={"data-row-" + index}>
                {getFields().map((field, index) => (
                  <td key={"column-data-" + index}>{datum[field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const chartTypeButtonHandler = (chartType) => {
    setFieldsToChart([]);
    setYaxis([]);
    setXaxis([]);
    setChartType(chartType);
  };

  const getAxisDataTypeMessage = (axis) => {
    if (axis === "any") {
      return null;
    } else {
      return "You have selected " + axis + " type for x-axis. Only one type can be selected.";
    }
  };

  const selectAxisOrField = (chartType) => {
    if (chartType === "Bar" || chartType === "Line") {
      return (
        <>
          <SelectItems
            info={getAxisDataTypeMessage(xAxisType)}
            label={"Fields for x-axis:"}
            items={getFieldsOfType(xAxisType)}
            itemsFilter={[...xAxis, ...yAxis]}
            selectedItems={xAxis}
            setSelectedItems={setXaxis}
          />
          <SelectItems
            type={"single"}
            label={"Fields for y-axis:"}
            items={yAxis.length < 1 ? getFieldsOfType("numeric") : []}
            itemsFilter={[...xAxis, ...yAxis]}
            selectedItems={yAxis}
            setSelectedItems={setYaxis}
          />
          <SelectItems
            type={"single"}
            label={"Select Y-axis aggregation type"}
            items={yAxisAggregationType.length < 1 ? ["min", "max", "sum", "average"] : []}
            itemsFilter={[]}
            selectedItems={yAxisAggregationType}
            setSelectedItems={setYaxisAggregationType}
          />
        </>
      );
    } else if (chartType === "Doughnut" || chartType === "Pie") {
      return (
        <SelectItems
          label={"Fields:"}
          items={getFields().filter((field) => field !== "label")}
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
        <button className={chartType === "Pie" ? selected : unselected} onClick={() => chartTypeButtonHandler("Pie")}>
          Pie
        </button>
        <button
          className={chartType === "Doughnut" ? selected : unselected}
          onClick={() => chartTypeButtonHandler("Doughnut")}
        >
          Doughnut
        </button>
        <button className={chartType === "Bar" ? selected : unselected} onClick={() => chartTypeButtonHandler("Bar")}>
          Bar
        </button>
        <button className={chartType === "Line" ? selected : unselected} onClick={() => chartTypeButtonHandler("Line")}>
          Line
        </button>
      </div>
    );
  };

  const getUniqueValuesForXaxisField = (xAxisField) => {
    const uniqueValues = [];
    for (let i = 0; i < data.length; i++) {
      if (!uniqueValues.includes(data[i][xAxisField])) {
        uniqueValues.push(data[i][xAxisField]);
      }
    }
    return uniqueValues;
  };

  const getUniqueValuesForXaxisFields = () => {
    const uniqueValuesPerField = {};
    for (let i = 0; i < xAxis.length; i++) {
      uniqueValuesPerField[xAxis[i]] = getUniqueValuesForXaxisField(xAxis[i]);
    }
    return uniqueValuesPerField;
  };

  const getMin = (data) => {
    return Math.min(...data);
  };

  const getMax = (data) => {
    return Math.max(...data);
  };

  const getSum = (data) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    return sum;
  };

  const getAverage = (data) => {
    if (!data.length) {
      return 0;
    }
    const sum = getSum(data);
    return sum / data.length;
  };

  const getYaxisAggregation = (field, value) => {
    const yAxisData = [];
    for (let i = 0; i < data.length; i++) {
      if (getDisplayValue(data[i][field]) === value) {
        yAxisData.push(getDisplayValue(data[i][yAxis[0]]));
      }
    }
    switch (yAxisAggregationType[0]) {
      case "min":
        return getMin(yAxisData);
      case "max":
        return getMax(yAxisData);
      case "average":
        return getAverage(yAxisData);
      case "sum":
      default:
        return getSum(yAxisData);
    }
  };

  const chart = () => {
    if (chartType === "Pie" && fieldsToChart.length > 0) {
      let labels = [];
      let datasets = [];
      let pieData = {};

      // build labels
      for (let i = 0; i < data.length; i++) {
        labels.push(i + 1);
      }

      // build dataset
      for (let i = 0; i < fieldsToChart.length; i++) {
        const localData = [];
        for (let j = 0; j < data.length; j++) {
          localData.push(getDisplayValue(data[j][fieldsToChart[i]]));
        }
        datasets.push({
          label: fieldsToChart[i],
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
          data: localData,
        });
      }

      pieData = {
        labels,
        datasets,
      };

      console.log(pieData);

      return <Pie data={pieData} />;
    }

    if (chartType === "Doughnut" && fieldsToChart.length > 0) {
      let labels = [];
      let datasets = [];
      let doughnutData = {};

      // build labels
      for (let i = 0; i < data.length; i++) {
        labels.push(i + 1);
      }

      // build dataset
      for (let i = 0; i < fieldsToChart.length; i++) {
        const localData = [];
        for (let j = 0; j < data.length; j++) {
          localData.push(getDisplayValue(data[j][fieldsToChart[i]]));
        }
        datasets.push({
          label: fieldsToChart[i],
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
          data: localData,
        });
      }

      doughnutData = {
        labels,
        datasets,
      };

      return <Doughnut data={doughnutData} />;
    }

    if (chartType === "Line" && xAxis.length > 0 && yAxis.length && yAxisAggregationType.length) {
      let labels = [];
      let datasets = [];
      let lineData = {};

      const localData = [];
      const uniqueValuesPerField = getUniqueValuesForXaxisFields();
      const fields = Object.keys(uniqueValuesPerField);

      // build labels
      for (let i = 0; i < fields.length; i++) {
        const uniqueValues = uniqueValuesPerField[fields[i]];
        for (let j = 0; j < uniqueValues.length; j++) {
          labels.push(fields[i] + ":" + getDisplayValue(uniqueValues[j]));
          localData.push(getYaxisAggregation(fields[i], getDisplayValue(uniqueValues[j])));
        }
      }

      // // build labels
      // for (let i = 0; i < data.length; i++) {
      //   labels.push(data[i].label);
      // }

      // // build dataset
      // for (let i = 0; i < xAxis.length; i++) {
      //   const localData = [];
      //   for (let j = 0; j < data.length; j++) {
      //     localData.push(getDisplayValue(data[j][xAxis[i]]));
      //   }
      //   datasets.push({
      //     label: xAxis[i],
      //     borderColor: getRandomColor(),
      //     borderWidth: 1,
      //     data: localData,
      //   });
      // }

      datasets.push({
        label: yAxis[0] + ":" + yAxisAggregationType[0],
        borderWidth: 1,
        data: localData,
        backgroundColor: getRandomColor(),
      });

      let options = {
        maintainAspectRation: false,
        responsive: true,
        legend: {
          display: true,
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

      lineData = {
        labels,
        datasets,
      };

      return <Line data={lineData} options={options} redraw />;
    }

    if (chartType === "Bar" && xAxis.length > 0 && yAxis.length && yAxisAggregationType.length) {
      let labels = [];
      let datasets = [];
      let barData = {};
      const localData = [];
      const uniqueValuesPerField = getUniqueValuesForXaxisFields();
      const fields = Object.keys(uniqueValuesPerField);

      // build labels
      for (let i = 0; i < fields.length; i++) {
        const uniqueValues = uniqueValuesPerField[fields[i]];
        for (let j = 0; j < uniqueValues.length; j++) {
          labels.push(fields[i] + ":" + getDisplayValue(uniqueValues[j]));
          localData.push(getYaxisAggregation(fields[i], getDisplayValue(uniqueValues[j])));
        }
      }

      // console.log(uniqueValuesPerField);
      // console.log(fields);
      // console.log(labels);
      // console.log(localData);
      // labels = [];

      // build labels
      // for (let i = 0; i < data.length; i++) {
      //   labels.push(data[i].label);
      // }

      // build dataset
      // for (let i = 0; i < xAxis.length; i++) {
      //   const localData = [];
      //   for (let j = 0; j < data.length; j++) {
      //     localData.push(getDisplayValue(data[j][xAxis[i]]));
      //   }
      //   datasets.push({
      //     label: xAxis[i],
      //     borderWidth: 1,
      //     data: localData,
      //     backgroundColor: getRandomColor(),
      //   });
      // }

      datasets.push({
        label: yAxis[0] + ":" + yAxisAggregationType[0],
        borderWidth: 1,
        data: localData,
        backgroundColor: getRandomColor(),
      });

      let options = {
        maintainAspectRation: false,
        responsive: true,
        legend: {
          display: true,
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

      barData = {
        labels,
        datasets,
      };

      return <Bar data={barData} options={options} redraw />;
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

  const getViewToggleInfo = () => {
    if (view === "table") {
      return {
        text: "Chart",
        clickHandler: viewButtonHandler,
      };
    } else {
      return {
        text: "Table",
        clickHandler: viewButtonHandler,
      };
    }
  };

  const getContent = () => {
    if (view === "table") {
      return tableView();
    } else {
      return chartView();
    }
  };

  const isFieldNumeric = (field) => {
    const firstRecord = data[0];
    return !isNaN(getDisplayValue(firstRecord[field]));
  };

  const getFieldsOfType = (type) => {
    const fields = getFields();
    const numericFields = [];
    const stringFields = [];
    for (let i = 0; i < fields.length; i++) {
      if (isFieldNumeric(fields[i])) {
        numericFields.push(fields[i]);
      } else {
        stringFields.push(fields[i]);
      }
    }
    if (type === "numeric") {
      return numericFields;
    } else if (type === "string") {
      return stringFields;
    } else {
      return fields;
    }
  };

  useEffect(() => {
    if (xAxis.length < 1) {
      setXaxisType("any");
    } else {
      if (isFieldNumeric(xAxis[0])) {
        setXaxisType("numeric");
      } else {
        setXaxisType("string");
      }
    }
  }, [xAxis]);

  return <DataUi name={getDataName()} viewToggle={getViewToggleInfo()} content={getContent()} />;
};

export default DataUiContainer;
