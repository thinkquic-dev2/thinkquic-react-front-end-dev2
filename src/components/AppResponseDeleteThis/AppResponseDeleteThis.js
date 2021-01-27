import React from "react";

import Records from "./responses/resultRecords.json";

const AppResponseDeleteThis = () => {
  const isAggregations = (jsonObject) => {
    const firstKey = Object.keys(jsonObject)[0];
    if (firstKey.includes("Aggregation")) {
      return true;
    } else {
      return false;
    }
  };

  const isRecords = (jsonObject) => {
    if (Array.isArray(jsonObject)) {
      return true;
    }
    return false;
  };

  const isSingleRecord = (jsonObject) => {
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

  const getResultType = (Result) => {
    if (isRecords(Result.Result)) {
      return "Records";
    }
    if (isSingleRecord(Result.Result)) {
      return "Record";
    }
    if (isAggregations(Result.Result)) {
      return "Aggregation";
    }
    return "Basic";
  };

  const getflatJsonResult = (Result) => {
    console.log("getFlatJsonResult");
    let flatAggregationData = [];
    const resultType = getResultType(Result);
    if (resultType === "Basic") {
      return Result.Result;
    }

    if (resultType === "Record") {
      return Result.Result.Doc1;
    }

    if (resultType === "Records") {
      return getRecordsArray(Result);
    }

    if (resultType === "Aggregation") {
      extractDataFromAggregation(Result.Result);
      return flatAggregationData;
    }

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

  console.log(getflatJsonResult(Records));

  return (
    <div>
      AppResponseDeleteThis
      <div>Hello</div>
    </div>
  );
};

export default AppResponseDeleteThis;
