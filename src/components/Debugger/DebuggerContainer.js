import React from "react";
import Debugger from "./Debugger";

import { AppContext } from "../../AppContext";
import { useContext } from "react";

const DebuggerContainer = () => {
  const { rawDataFile, uploadFileInputRef } = useContext(AppContext);

  const showRawDataFile = () => {
    console.log(rawDataFile);
  };
  const showUploadFileInputRefValue = () => {
    console.log(uploadFileInputRef.current.files);
  };
  const resetUploadFileInputRef = () => {
    uploadFileInputRef.current.value = null;
  };

  return (
    <Debugger
      showRawDataFile={showRawDataFile}
      showUploadFileInputRefValue={showUploadFileInputRefValue}
      resetUploadFileInputRef={resetUploadFileInputRef}
    />
  );
};
export default DebuggerContainer;
