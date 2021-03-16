import React from "react";

import "./FileUploadError.scss";

import { defaultFileIcon, closeIcon } from "../../../Icons/Icons";

const FileUploadError = (props) => {
  const { text, removeFileFromFileUploadErrors } = props;
  return (
    <div className="file-upload-error">
      <div className="file-upload-error__notification">
        <span className="file-upload-error__message">Upload Error</span>
        <button className="file-upload-error__close-button" onClick={removeFileFromFileUploadErrors}>
          {closeIcon}
        </button>
      </div>
      <div className="file-upload-error__file">
        <span className="file-upload-error__icon">{defaultFileIcon}</span>
        <span className="file-upload-error__filename">{text}</span>
      </div>
    </div>
  );
};

export default FileUploadError;
