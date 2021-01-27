import React from "react";
const ChartableMessage = ({ message }) => {
  const renderMessageData = () => {
    const fields = Object.keys(message.data[0]);
    const fieldHeading = (
      <thead>
        <tr>
          {fields.map((fieldHeading, index) => {
            return <th key={"field-heading-" + index}>{fieldHeading}</th>;
          })}
        </tr>
      </thead>
    );
    return (
      <table className="table table--in-message">
        {fieldHeading}
        <tbody>
          {message.data.map((record, index) => {
            const row = (
              <tr key={"row-" + index}>
                {fields.map((fieldValue, index) => {
                  return (
                    <td key={"field-value-" + index}>{record[fieldValue]}</td>
                  );
                })}
              </tr>
            );
            return row;
          })}
        </tbody>
      </table>
    );
  };
  return <div>{renderMessageData()}</div>;
};

export default ChartableMessage;
