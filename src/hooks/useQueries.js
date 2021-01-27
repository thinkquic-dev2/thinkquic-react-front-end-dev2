import { useState, useEffect } from "react";

const useQueries = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const lastQuery = queries[queries.length - 1];

    if (queries.length > 0 && lastQuery.from === 'user') {
      const userMessageArr = lastQuery.message.split(" ");
      const chartCommand = userMessageArr[0];
      const fieldToChart = userMessageArr[1];

      if (chartCommand.includes('chart') && fieldToChart) {
        setQueries([...queries, { from: 'app', message: 'getting chart', data: { fieldToChart } }]);
      } else {
        setQueries([...queries, { from: 'app', message: lastQuery.message }]);
      }
    }
  }, [queries]);

  return {
    queries,
    setQueries
  }
}

export default useQueries;
