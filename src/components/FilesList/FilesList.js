import React from "react";

import "./FilesList.scss";

import FileContainer from "../File/FileContainer";
import FileUploading from "./FileUploading/FileUploading";
import FileUploadError from "./FileUploadError/FileUploadError";

import { closeIcon } from "../../Icons/Icons";

const FilesList = (props) => {
  const {
    searchString,
    setSearchString,
    files,
    folders,
    isFilesListVisible,
    toggleIsFilesListVisible,
    onFolderClick,
    onFileClick,
    deleteFile,
    pendingFileUploads,
    fileUploadErrors,
    removeFileFromFileUploadErrors,
  } = props;

  const filesListClass = isFilesListVisible ? "files-list files-list--visible" : "files-list";
  return (
    <div className={filesListClass}>
      <div className="files-list__header">
        <span className="files-list__heading">Files</span>
        <button className="files-list__close-button" onClick={toggleIsFilesListVisible}>
          {closeIcon}
        </button>
      </div>
      <input
        placeholder={"search files"}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        className="form-control files-list__search"
      ></input>
      {props.children}
      <div className="files-list__items">
        {pendingFileUploads.map((pendingFileUpload, index) => {
          return <FileUploading key={pendingFileUpload + "-" + index} text={pendingFileUpload} />;
        })}
        {fileUploadErrors.map((fileUploadError, index) => {
          return (
            <FileUploadError
              key={fileUploadError + "-" + index}
              text={fileUploadError}
              removeFileFromFileUploadErrors={() => removeFileFromFileUploadErrors(fileUploadErrors)}
            />
          );
        })}
        {folders.map((folderName, index) => {
          if (folderName.includes(searchString)) {
            return (
              <FileContainer
                onClick={onFolderClick}
                deleteFile={deleteFile}
                text={folderName}
                type={"folder"}
                key={"folder-" + { folderName } + "-" + index}
              />
            );
          }
          return null;
        })}
        {files.map((fileName, index) => {
          if (fileName.includes(searchString)) {
            return (
              <FileContainer
                onClick={onFileClick}
                deleteFile={deleteFile}
                text={fileName}
                type={"file"}
                key={"file-" + { fileName } + "-" + index}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FilesList;
