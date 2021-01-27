import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import AgTableNew from "./AgTableNew";

const TableContainer = ({
  setIsTableVisible,
  onGridReady,
  onColumnVisible,
}) => {
  const {
    jsonDataFile,
    setJsonDataFile,
    uploadFile,
    uploadFileInputRef,
    isUploadButtonEnabled,
    resetFileInputRefValue,
    username,
  } = useContext(AppContext);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const fileUploadedMessage = isFileUploaded ? (
    <div
      className="alert alert-success mb-0 d-flex align-items-center"
      role="alert"
    >
      The file was successfully uploaded
      <svg
        className="ml-3"
        fill="#3D774B"
        height="24px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
        <path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      </svg>
    </div>
  ) : null;
  const discardTableIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  );
  const fullScreenIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </svg>
  );
  const exitFullScreenIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
    </svg>
  );
  const uploadIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
    </svg>
  );
  const minimizeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M6 19h12v2H6z" />
    </svg>
  );

  const isTableVisible = jsonDataFile ? true : false;

  const tableContainerClass = isFullScreen
    ? "table-container table-container--fullscreen"
    : "table-container";

  const screenSizeControlButton = isFullScreen ? (
    <ButtonIcon
      onClickHandler={() => setIsFullScreen(false)}
      svgIcon={exitFullScreenIcon}
    />
  ) : (
    <ButtonIcon
      onClickHandler={() => setIsFullScreen(true)}
      svgIcon={fullScreenIcon}
    />
  );

  const uploadFileButton = isUploadButtonEnabled ? (
    <ButtonIcon
      onClickHandler={() => handleUploadFileButtonClick()}
      svgIcon={uploadIcon}
    />
  ) : null;

  const table = isTableVisible ? (
    <AgTableNew
      jsonData={jsonDataFile}
      onGridReady={onGridReady}
      onColumnVisible={onColumnVisible}
    />
  ) : null;

  // event handlers
  const handleUploadFileButtonClick = () => {
    uploadFile(uploadFileInputRef.current.files[0], username);
    resetFileInputRefValue();
    setIsFileUploaded(true);
  };

  const handleDiscardTableButtonClick = () => {
    setJsonDataFile(null);
    resetFileInputRefValue();
  };

  return (
    <div className={tableContainerClass}>
      <div className="table-container__controls">
        {uploadFileButton}
        {fileUploadedMessage}
        <div className="ml-auto">
          <ButtonIcon
            onClickHandler={() => setIsTableVisible(false)}
            svgIcon={minimizeIcon}
          />
          {screenSizeControlButton}
          <ButtonIcon
            onClickHandler={() => handleDiscardTableButtonClick()}
            svgIcon={discardTableIcon}
          />
        </div>
      </div>
      {table}
    </div>
  );
};

export default TableContainer;
