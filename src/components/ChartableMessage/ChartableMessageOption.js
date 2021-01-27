import React from "react";

const ChartableMessageOption = ({ text, icon, onClickHandler }) => {
  const handleButtonMouseEnter = (event) => {
    const $ = window.$;
    $(event.target).tooltip("show");
  };
  const handleButtonMouseLeave = () => {
    const $ = window.$;
    $("body").find('[data-toggle="tooltip"]').tooltip("hide");
  };
  return (
    <button
      onMouseEnter={(e) => {
        handleButtonMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        handleButtonMouseLeave(e);
      }}
      className="btn btn-secondary chartable-message__option"
      onClick={() => {
        onClickHandler();
        handleButtonMouseLeave();
      }}
      data-toggle="tooltip"
      data-placement="right"
      title={text}
    >
      {icon}
    </button>
  );
};

export default ChartableMessageOption;
