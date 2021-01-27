import React from "react";
import "./Debugger.scss";

const Debugger = ({
  showRawDataFile,
  showUploadFileInputRefValue,
  resetUploadFileInputRef,
}) => {
  return (
    <div className="debugger">
      Debugger <br />
      <button onClick={showRawDataFile}>show rawDataFile</button>
      <br />
      <button onClick={showUploadFileInputRefValue}>
        show uploadFileInputRef
      </button>
      <br />
      <button onClick={resetUploadFileInputRef}>
        reset uploadFileInputRef
      </button>
    </div>
  );
};

export default Debugger;
