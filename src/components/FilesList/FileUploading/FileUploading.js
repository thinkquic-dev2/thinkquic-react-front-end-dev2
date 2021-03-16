import React from "react";

import "./FileUploading.scss";

import { defaultFileIcon } from "../../../Icons/Icons";

const FileUploading = (props) => {
  const { text } = props;
  return (
    <div className="file-uploading">
      <div className="file-uploading__notifications">
        <span className="file-uploading__message">Uploading</span>
        <div className="file-uploading__spinner spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <div className="file-uploading__file">
        <span className="file-uploading__icon">{defaultFileIcon}</span>
        <span className="file-uploading__filename">{text}</span>
      </div>
    </div>
  );
};

export default FileUploading;
