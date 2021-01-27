import React from "react";

import "./FilesList.scss";

import File from "../File/File";

// import { PropertyKeys } from "ag-grid-community";

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
  } = props;
  const filesListClass = isFilesListVisible
    ? "files-list files-list--visible"
    : "files-list";
  const closeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
  return (
    <div className={filesListClass}>
      <div className="files-list__header">
        <span className="files-list__heading">Files</span>
        <button
          className="files-list__close-button"
          onClick={toggleIsFilesListVisible}
        >
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
      {folders.map((folderName, index) => (
        <File
          onClick={onFolderClick}
          text={folderName}
          type={"folder"}
          key={"folder" + index}
        />
      ))}
      {files.map((fileName, index) => (
        <File
          onClick={onFileClick}
          text={fileName}
          type={"file"}
          key={"file" + index}
        />
      ))}
    </div>
  );
};

export default FilesList;
