import React from "react";

const AggregationMessage = ({ aggregationData }) => {
  const aggregationTable = () => {
    const aggregationDataKeys = Object.keys(aggregationData);
    const rows = [];
    for (let i = 0; i < aggregationDataKeys.length; i++) {
      rows.push(
        <tr key={"aggregation-key-" + i}>
          <th>{aggregationDataKeys[i]}</th>
          <td>{aggregationData[aggregationDataKeys[i]]}</td>
        </tr>
      );
    }

    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return <div className="aggregation">{aggregationTable()}</div>;
};

export default AggregationMessage;
