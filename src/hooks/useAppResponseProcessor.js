const useAppResponseProcessor = () => {
  const isAggregations = (jsonObject) => {
    if (!jsonObject) {
      return false;
    }
    const firstKey = Object.keys(jsonObject)[0];
    if (firstKey.includes("Aggregation")) {
      return true;
    } else {
      return false;
    }
  };

  const isTable = (jsonObject) => {
    if (!jsonObject) {
      return false;
    }

    if (Array.isArray(jsonObject)) {
      return true;
    }
    return false;
  };

  const isSingleRecord = (jsonObject) => {
    if (!jsonObject) {
      return false;
    }

    const objectKeys = Object.keys(jsonObject);
    if (objectKeys.length === 1 && objectKeys[0].includes("Doc")) {
      return true;
    }
    return false;
  };

  const getRecordsArray = (Result) => {
    const recordsArray = [];

    for (let i = 0; i < Result.Result.length; i++) {
      const recordKey = Object.keys(Result.Result[i]);
      recordsArray.push(Result.Result[i][recordKey[0]]);
    }

    return recordsArray;
  };

  const isBasic = (jsonObject) => {
    const jsonObjectKeys = Object.keys(jsonObject);
    if (!jsonObject) {
      return false;
    }
    if (jsonObjectKeys.includes("Text") && jsonObjectKeys.includes("Buttons")) {
      return false;
    }
    return true;
  };

  const isOptions = (jsonObject) => {
    const jsonObjectKeys = Object.keys(jsonObject);

    if (
      !jsonObjectKeys.includes("Buttons") ||
      !jsonObjectKeys.includes("Text")
    ) {
      return false;
    }
    return true;
  };

  const getResultType = (Result) => {
    if (isTable(Result.Result)) {
      return "Table";
    }
    if (isSingleRecord(Result.Result)) {
      return "Record";
    }
    if (isAggregations(Result.Result)) {
      return "Aggregation";
    }
    if (isBasic(Result.Result)) {
      return "Basic";
    }
    if (isOptions(Result.Result)) {
      return "Options";
    }
    return "Unsupported";
  };

  const getFlatJsonResult = (Result) => {
    let flatAggregationData = [];

    const resultType = getResultType(Result);

    if (resultType === "Basic") {
      return Result.Result;
    }

    if (resultType === "Record") {
      return Result.Result.Doc1;
    }

    if (resultType === "Table") {
      return getRecordsArray(Result);
    }

    if (resultType === "Aggregation") {
      extractDataFromAggregation(Result.Result);
      return flatAggregationData;
    }

    if (resultType === "Options") {
      return Result.Result;
    }

    return { error: true, message: "JSON is not supported" };

    function extractDataFromAggregation(aggregation) {
      const aggregationKeys = Object.keys(aggregation);
      for (let i = 0; i < aggregationKeys.length; i++) {
        if (aggregationKeys[i].includes("Aggregation")) {
          extractDataFromAggregation(aggregation[aggregationKeys[i]]);
        } else if (aggregationKeys[i].includes("statistics")) {
          flatAggregationData.push({
            field: aggregation[aggregationKeys[i]].stats_key,
            stats: aggregation[aggregationKeys[i]].stats,
          });
        } else if (aggregationKeys[i].includes("groupby")) {
          flatAggregationData.push({
            filters: aggregation[aggregationKeys[i]].groupby_key,
            field: aggregation[aggregationKeys[i]].stats_key,
            stats: aggregation[aggregationKeys[i]].stats,
          });
        } else {
          console.log("format unsupported");
        }
      }
    }
  };

  return {
    getFlatJsonResult,
    getResultType,
  };
};

export default useAppResponseProcessor;
