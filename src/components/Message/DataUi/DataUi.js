import React from "react";

const DataUi = (props) => {
  const { name, viewToggle, content } = props;
  return (
    <div className="data-ui">
      <div className="data-ui__name">{name}</div>
      <div className="data-ui__options">
        <span className="data-ui__options-label">Toggle View: </span>
        <button className="btn btn-outline-info mx-3" onClick={viewToggle.clickHandler}>
          {viewToggle.text}
        </button>
      </div>
      <div className="data-ui__content">{content}</div>
    </div>
  );
};

export default DataUi;
