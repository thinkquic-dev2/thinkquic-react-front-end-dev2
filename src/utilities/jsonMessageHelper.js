export const getAggregationsFromMessage = (message) => {
  let aggregation = {};
  return aggregation;
};

export const getDataFromMessage = (message) => {
  let data = [];
  return data;
};

export const getButtonsFromMessage = (message) => {
  let buttons = [];
  return buttons;
};

export const getTextFromMessage = (message) => {
  let texts = [];
  return texts;
};

export const isMessageJson = (message) => {
  try {
    JSON.parse(message);
  } catch (error) {
    return false;
  }
  return true;
};

export const isArray = (jsonItem) => {
  if (Array.isArray(jsonItem)) {
    return true;
  }
  return false;
};

export function getFlattendedAggregationData(aggregation) {
  let flattenedAggregationData = [];
  getChildrenAggregationDataRecursively(aggregation, flattenedAggregationData);
  return flattenedAggregationData;

  function getChildrenAggregationDataRecursively(aggregation, flattenedAggregationData) {
    const aggregationChildrenKeys = Object.keys(aggregation);
    for (let i = 0; i < aggregationChildrenKeys.length; i++) {
      if (hasAggregationChildren(aggregation)) {
        getChildrenAggregationDataRecursively(aggregation[aggregationChildrenKeys[i]], flattenedAggregationData);
      } else {
        const aggregationData = getContent(aggregation[aggregationChildrenKeys[i]]);
        if (Array.isArray(aggregationData)) {
          //  is from grouping data
          for (let i = 0; i < aggregationData.length; i++) {
            flattenedAggregationData.push(aggregationData[i]);
          }
        } else {
          // data is statistics data
          flattenedAggregationData.push(aggregationData);
        }
      }
    }
  }

  function hasAggregationChildren(aggregation) {
    const aggregationKey = Object.keys(aggregation)[0];
    const aggregationContent = aggregation[aggregationKey];
    const aggregationContentKey = Object.keys(aggregationContent)[0];
    if (aggregationContentKey.toLocaleLowerCase().includes("aggregation")) {
      return true;
    } else {
      return false;
    }
  }

  function getContentType(aggregation) {
    const contentFirstKey = Object.keys(aggregation)[0];

    if (contentFirstKey.toLocaleLowerCase().includes("statistics")) {
      return "statistics";
    }

    if (contentFirstKey.toLocaleLowerCase().includes("group")) {
      return "grouping";
    }

    return "unsupported";
  }

  function getContent(aggregation) {
    switch (getContentType(aggregation)) {
      case "statistics":
        return getStatisticsContent(aggregation);
      case "grouping":
        return getGroupingContent(aggregation);
      default:
        console.log("unsupported");
    }
  }

  function getGroupingContent(aggregation) {
    let groupingContents = [];
    const groupingKeys = Object.keys(aggregation);
    for (let i = 0; i < groupingKeys.length; i++) {
      groupingContents.push(aggregation[groupingKeys[i]]);
    }
    return groupingContents;
  }

  function getStatisticsContent(aggregation) {
    const aggregationKey = Object.keys(aggregation)[0]; //this should always be statistics;
    const aggregationContent = aggregation[aggregationKey];
    return aggregationContent;
  }
}

export function getMessageSource(message) {
  return message.from;
}

export const isMessageFromUser = (message) => {
  if (message.from === "user") {
    return true;
  } else {
    return false;
  }
};

export const getDecomposedJsonMessage = (message) => {
  const jsonResult = JSON.parse(message).Result;
  const chartableItems = jsonResult.Chart;
  const aggregations = chartableItems.Aggregation || chartableItems.Aggregations;
  const data = chartableItems.Data;
  const buttons = jsonResult.Button;
  const texts = jsonResult.Text;

  return {
    aggregations,
    data,
    buttons,
    texts,
  };
};

export const mergeDataItemsIntoTable = (data) => {
  if (data.length < 1) {
    return null;
  }
  let commonFields = [];
  let propertiesOfFirstObject = [];
  let mergedData = [];
  const setPropertiesOfFirstObject = () => {
    const firstObjectMainKey = Object.keys(data[0])[0];
    const firstObjectContentProperties = Object.keys(data[0][firstObjectMainKey]);
    propertiesOfFirstObject = [...firstObjectContentProperties];
  };

  const isPropertyCommonToAllData = (property) => {
    for (let i = 0; i < data.length; i++) {
      const datumMainKey = Object.keys(data[i])[0];
      const datumContent = data[i][datumMainKey];
      const datumContentKeys = Object.keys(datumContent);
      if (!datumContentKeys.includes(property)) {
        return false;
      }
    }
    return true;
  };

  const setCommonFields = () => {
    for (let i = 0; i < propertiesOfFirstObject.length; i++) {
      if (isPropertyCommonToAllData(propertiesOfFirstObject[i])) {
        commonFields.push(propertiesOfFirstObject[i]);
      }
    }
  };

  const setMergedData = () => {
    for (let i = 0; i < data.length; i++) {
      const datumMainKey = Object.keys(data[i])[0];
      const datumContent = data[i][datumMainKey];
      let rowData = {};
      rowData.label = datumMainKey;
      for (let j = 0; j < commonFields.length; j++) {
        rowData[commonFields[j]] = datumContent[commonFields[j]];
      }
      mergedData.push(rowData);
    }
  };

  setPropertiesOfFirstObject();
  setCommonFields();
  setMergedData();

  mergedData = [];
  for (let i = 0; i < data.length; i++) {
    const dataFirstKey = Object.keys(data[i])[0];
    mergedData.push(data[i][dataFirstKey]);
  }
  return mergedData;
};
