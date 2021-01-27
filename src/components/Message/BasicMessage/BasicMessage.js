import React from "react";

const BasicMessage = ({ data }) => {
  const table = () => {
    const dataKeys = Object.keys(data);
    const rows = [];
    for (let i = 0; i < dataKeys.length; i++) {
      rows.push(
        <tr key={"basic-data-key-" + i}>
          <th>{dataKeys[i]}</th>
          <td>{data[dataKeys[i]]}</td>
        </tr>
      );
    }

    return (
      <table className="table table--in-message">
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return <div>{table()}</div>;
};

export default BasicMessage;
