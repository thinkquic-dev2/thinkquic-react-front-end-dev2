import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";

import { FileUploadContext } from "../../FileUploadContext";
import { AppContext } from "../../AppContext";

import useAgTable from "../../hooks/useAgTable";

import ButtonIcon from "../ButtonIcon/ButtonIcon";
import AgTableNew from "../AgTable/AgTableNew";

import "./FilePreviewTable.scss";

import {
  discardTableIcon,
  fullScreenIcon,
  exitFullScreenIcon,
  uploadIcon,
  minimizeIcon,
  uploadSuccessIcon,
  closeIcon,
} from "../../Icons/Icons";

const FilePreviewTable = ({ setIsTableVisible, setIsTableToggleVisible }) => {
  const fileUploadContext = useContext(FileUploadContext);
  const appContext = useContext(AppContext);

  const { onGridReady, onColumnVisible } = useAgTable(fileUploadContext.jsonData);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const tableContainerClass = isFullScreen ? " file-preview-table--fullscreen" : "";

  const sizingIcon = isFullScreen ? exitFullScreenIcon : fullScreenIcon;

  const handleFullScreenToggleClick = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleCloseButtonClick = () => {
    setIsTableVisible(false);
    setIsTableToggleVisible(false);
    fileUploadContext.clearFileUploadData();
  };

  const handleMinimizeButtonClick = () => {
    setIsTableVisible(false);
  };

  const handleUploadButtonClick = () => {
    fileUploadContext.uploadFile();
    setIsTableVisible(false);
  };

  const uploadButton =
    fileUploadContext.uploadStatus !== "success" && !fileUploadContext.isFileFromS3 ? (
      <button
        className="file-preview-table__button file-preview-table__button--upload"
        onClick={handleUploadButtonClick}
      >
        {uploadIcon}
      </button>
    ) : null;

  const uploadStatusMessage = () => {
    if (!fileUploadContext.uploadStatus) {
      return null;
    }
    // return null for now; needs to be refactored
    return null;
    if (fileUploadContext.uploadStatus === "success" && appContext.pendingFileUploads.length < 1) {
      return (
        <div className="file-preview-table__upload-status-message alert alert-success">file has been uploaded</div>
      );
    } else {
      return <div className="file-preview-table__upload-status-message alert alert-info">file is uploading</div>;
    }
  };

  return (
    <div className={"file-preview-table" + tableContainerClass}>
      <div className="file-preview-table__heading">
        {uploadStatusMessage()}
        {uploadButton}
        <div className="file-preview-table__filename">{fileUploadContext.getFileName()}</div>
        <button
          className="file-preview-table__button file-preview-table__button--minimize"
          onClick={handleMinimizeButtonClick}
        >
          {minimizeIcon}
        </button>
        <button
          className="file-preview-table__button file-preview-table__button--fullscreen-toggle"
          onClick={handleFullScreenToggleClick}
        >
          {sizingIcon}
        </button>
        <button
          className="file-preview-table__button file-preview-table__button--close"
          onClick={handleCloseButtonClick}
        >
          {closeIcon}
        </button>
      </div>
      {fileUploadContext.jsonData ? (
        <AgTableNew jsonData={fileUploadContext.jsonData} onGridReady={onGridReady} onColumnVisible={onColumnVisible} />
      ) : null}
    </div>
  );
};

export default FilePreviewTable;
