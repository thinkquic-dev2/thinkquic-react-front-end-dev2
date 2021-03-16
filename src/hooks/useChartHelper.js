const useChartHelper = () => {
  window.chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)",
  };

  const randomColor = () => {
    const chartColorsKeys = Object.keys(window.chartColors);
    return window.chartColors[
      chartColorsKeys[Math.floor(Math.random() * 7) + 1 - 1]
    ];
  };

  const formatDataForChart = (data, chartType) => {
    const labels = []; // each item
    const datasets = []; // quantity on hand, quantity sold
    const dataOne = [];
    const dataTwo = [];
    let firstField = null;
    let secondField = null;
    let thirdField = null;

    // set labels
    for (let i = 0; i < data.length; i++) {
      firstField = Object.keys(data[i])[0];
      secondField = Object.keys(data[i])[1];
      thirdField = Object.keys(data[i])[2];
      labels.push(data[i][firstField]);
      dataOne.push(data[i][secondField]);
      dataTwo.push(data[i][thirdField]);
    }

    // set datasets
    const backgroundColorOne =
      chartType === "pie" || chartType === "doughnut"
        ? [
            "rgba(191, 63, 63, .2)",
            "rgba(63, 191, 63, .2)",
            "rgb(54, 162, 235, .2)",
          ]
        : "rgba(191, 63, 63, .2)";
    const borderColorOne =
      chartType === "pie" || chartType === "doughnut"
        ? [
            "rgba(191, 63, 63, 1)",
            "rgba(63, 191, 63, 1)",
            "rgb(54, 162, 235, 1)",
          ]
        : "rgba(191, 63, 63, 1)";

    const backgroundColorTwo =
      chartType === "pie" || chartType === "doughnut"
        ? [
            "rgba(191, 63, 63, .2)",
            "rgba(63, 191, 63, .2)",
            "rgb(54, 162, 235, .2)",
          ]
        : "rgba(63, 191, 127, .2)";
    const borderColorTwo =
      chartType === "pie" || chartType === "doughnut"
        ? [
            "rgba(191, 63, 63, 1)",
            "rgba(63, 191, 63, 1)",
            "rgb(54, 162, 235, 1)",
          ]
        : "rgba(63, 191, 127, 1)";
    datasets.push({
      label: secondField,
      backgroundColor: backgroundColorOne,
      borderColor: borderColorOne,
      borderWidth: 1,
      data: dataOne,
    });
    datasets.push({
      label: thirdField,
      backgroundColor: backgroundColorTwo,
      borderColor: borderColorTwo,
      borderWidth: 1,
      data: dataTwo,
    });

    return {
      labels: labels,
      datasets: datasets,
    };
  };

  const formatRecordDataForChart = (data) => {
    return {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Dataset 1",
          borderColor: window.chartColors.red,
          borderWidth: 1,
          data: [1, 2, 3, 4, 5, 6, 7],
        },
        {
          label: "Dataset 2",
          borderColor: window.chartColors.blue,
          borderWidth: 1,
          data: [7, 6, 5, 4, 3, 2, 1],
        },
        {
          label: "Dataset 3",
          borderColor: window.chartColors.blue,
          borderWidth: 1,
          data: [5, 4, 3, 2, 1, 6, 7],
        },
      ],
    };
  };

  const formatTableDataForChart = (data, chartType) => {
    let labels = []; //dataset
    let datasets = [];
    let dataArray = [];

    for (let i = 0; i < data.length; i++) {
      const recordFields = Object.keys(data[i]);

      labels.push("Record " + i);

      for (let j = 0; j < recordFields.length; j++) {
        dataArray.push(data[i][recordFields[j]]);
      }
    }

    datasets.push({
      label: Object.keys(data[0])[0],
      borderColor: randomColor(),
      borderWidth: 1,
      data: dataArray,
    });

    return {
      labels: labels,
      datasets: datasets,
    };
  };

  const formatBasicDataForChart = (data, chartType) => {
    console.log(data);
    let dataKeys = Object.keys(data);
    let labels = [];
    let dataArray = [];
    for (let i = 0; i < dataKeys.length; i++) {
      labels.push(dataKeys[i]);
      dataArray.push(data[dataKeys[i]].value);
    }
    return {
      labels: labels,
      datasets: [
        {
          label: "Dataset 1",
          borderColor: window.chartColors.blue,
          borderWidth: 1,
          data: dataArray,
        },
      ],
    };
  };

  const formatAggregationDataForChart = (data, chartType) => {
    if (Array.isArray(data)) {
      let labels = [];
      let dataArray = [];
      for (let i = 0; i < data.length; i++) {
        labels.push(data[i].key);
        dataArray.push(data[i].doc_count);
      }
      return {
        labels: labels,
        datasets: [
          {
            label: "Dataset 1",
            borderColor: window.chartColors.red,
            borderWidth: 1,
            data: dataArray,
          },
        ],
      };
    } else {
      const dataKeys = Object.keys(data);
      let labels = [];
      let dataArray = [];
      for (let i = 0; i < dataKeys.length; i++) {
        if (dataKeys[i] !== "sum" && dataKeys[i] !== "count") {
          labels.push(dataKeys[i]);
          dataArray.push(data[dataKeys[i]]);
        }
      }
      return {
        labels: labels,
        datasets: [
          {
            label: "Dataset 1",
            borderColor: window.chartColors.red,
            borderWidth: 1,
            data: dataArray,
          },
        ],
      };
    }
  };

  return {
    formatDataForChart,
    formatRecordDataForChart,
    formatTableDataForChart,
    formatBasicDataForChart,
    formatAggregationDataForChart,
  };
};

export default useChartHelper;
