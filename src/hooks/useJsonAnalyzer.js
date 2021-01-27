const useJsonAnalyzer = () => {
  const analyzeJson = (jsonObject) => {
    const jsonProperties = Object.keys(jsonObject);
    let propertiesMetaData = {};
    jsonProperties.map((property) => {
      if (typeof jsonObject[property] === "object") {
        propertiesMetaData[property] = analyzeJson(jsonObject[property]);
      } else if (!isNaN(jsonObject[property])) {
        propertiesMetaData[property] = "numeric";
      } else {
        propertiesMetaData[property] = "string";
      }
      return null;
    });
    return propertiesMetaData;
  };

  return {
    analyzeJson,
  };
};

export default useJsonAnalyzer;
