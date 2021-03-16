import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import AgTableNew from "./AgTableNew";

import {
  discardTableIcon,
  fullScreenIcon,
  exitFullScreenIcon,
  uploadIcon,
  minimizeIcon,
  uploadSuccessIcon,
  closeIcon,
} from "../../Icons/Icons";

const TableContainer = ({ setIsTableVisible, onGridReady, onColumnVisible }) => {
  const {
    jsonDataFile,
    setJsonDataFile,
    uploadFile,
    uploadFileInputRef,
    isUploadButtonEnabled,
    resetFileInputRefValue,
    username,
    files,
    pendingFileUploads,
    fileUploadErrors,
  } = useContext(AppContext);

  //console.log(files, pendingFileUploads, fileUploadErrors);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const [uploadStatus, setUploadStatus] = useState("initial");

  const [isUploadStatusVisible, setIsUploadStatusVisible] = useState(false);

  const uploadStatusAlertClasses = () => {
    if (uploadStatus === "success") {
      return "alert alert-success mb-0 d-flex align-items-center";
    } else if (uploadStatus === "error") {
      return "alert alert-danger mb-0 d-flex align-items-center";
    }
  };

  const uploadStatusAlertMessage = () => {
    if (uploadStatus === "success") {
      return "Your file has been queued for upload";
    } else if (uploadStatus === "error") {
      return "You file was not uploaded.";
    }
  };

  const uploadStatusAlertIcon = () => {
    if (uploadStatus === "success") {
      return uploadSuccessIcon;
    } else if (uploadStatus === "error") {
      return closeIcon;
    }
  };

  const fileUploadedMessage = (
    <div className={uploadStatusAlertClasses()} role="alert">
      {uploadStatusAlertMessage()}
      {uploadStatusAlertIcon()}
    </div>
  );

  const isTableVisible = jsonDataFile ? true : false;

  const tableContainerClass = isFullScreen ? "table-container table-container--fullscreen" : "table-container";

  const screenSizeControlButton = isFullScreen ? (
    <ButtonIcon onClickHandler={() => setIsFullScreen(false)} svgIcon={exitFullScreenIcon} />
  ) : (
    <ButtonIcon onClickHandler={() => setIsFullScreen(true)} svgIcon={fullScreenIcon} />
  );

  const uploadFileButton =
    uploadStatus !== "success" ? (
      <ButtonIcon onClickHandler={() => handleUploadFileButtonClick()} svgIcon={uploadIcon} />
    ) : null;

  const table = isTableVisible ? (
    <AgTableNew jsonData={jsonDataFile} onGridReady={onGridReady} onColumnVisible={onColumnVisible} />
  ) : null;

  // event handlers
  const handleUploadFileButtonClick = () => {
    uploadFile(uploadFileInputRef.current.files[0], username, (status) => {
      if (status === "success") {
        resetFileInputRefValue();
      }
      setUploadStatus(status);
      setIsUploadStatusVisible(true);
    });
  };

  const handleDiscardTableButtonClick = () => {
    setJsonDataFile(null);
    resetFileInputRefValue();
  };

  useEffect(() => {
    setUploadStatus("initial");
  }, [jsonDataFile]);

  return (
    <div className={tableContainerClass}>
      <div className="table-container__controls">
        {uploadFileButton}
        {fileUploadedMessage}
        <div className="ml-auto">
          <ButtonIcon onClickHandler={() => setIsTableVisible(false)} svgIcon={minimizeIcon} />
          {screenSizeControlButton}
          <ButtonIcon onClickHandler={() => handleDiscardTableButtonClick()} svgIcon={discardTableIcon} />
        </div>
      </div>
      {table}
    </div>
  );
};

export default TableContainer;
