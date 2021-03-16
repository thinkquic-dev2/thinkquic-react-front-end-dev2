import React from "react";

import { useState, useContext } from "react";

import FilesList from "../FilesList/FilesList";

import useExcelToJson from "../../hooks/useExcelToJson";

import { AppContext } from "../../AppContext";

import { FileUploadContext } from "../../FileUploadContext";

const FilesListContainer = ({ isFilesListVisible, toggleIsFilesListVisible }) => {
  const {
    setJsonDataFile,
    files,
    folders,
    currentDirectoryPath,
    setCurrentDirectoryPath,
    getFile,
    deleteFile,
    pendingFileUploads,
    fileUploadErrors,
    removeFileFromFileUploadErrors,
  } = useContext(AppContext);

  const fileUploadContext = useContext(FileUploadContext);

  const { convertExcelFromS3ToJson } = useExcelToJson();
  const [searchString, setSearchString] = useState("");

  const generateCurrentDirectoryPathString = () => {
    let currentDirectoryPathString = "";
    currentDirectoryPath.forEach((path) => {
      currentDirectoryPathString += path + "/";
    });
    return currentDirectoryPathString;
  };

  const onFileClick = async (filename) => {
    let file = null;
    if (filename.includes(".csv") || filename.includes(".xlsx")) {
      file = await getFile(generateCurrentDirectoryPathString() + filename);
      fileUploadContext.handleS3FilePreview(file.Body, filename);
      toggleIsFilesListVisible();
    } else {
      // console.log("did not do anything because file is not a csv");
      return;
    }
  };

  const onFolderClick = (folder) => {
    setCurrentDirectoryPath([...currentDirectoryPath, folder]);
  };

  const renderBreadcrumb = () => {
    const currentDirectoryPathWithHome = ["Home", ...currentDirectoryPath];
    const breadcrumb = currentDirectoryPathWithHome.map((path, index) => {
      if (index < currentDirectoryPathWithHome.length - 1) {
        return (
          <li className="breadcrumb__item breadcrumb__item--active" onClick={() => onCrumbClick(index)} key={index}>
            {/* <button className="btn btn-link" >{path}</button> */}
            {path}
          </li>
        );
      } else {
        return (
          <li className="breadcrumb__item" onClick={() => onCrumbClick(index)} key={index}>
            {path}
          </li>
        );
      }
    });
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">{breadcrumb}</ol>
      </nav>
    );
  };

  const onCrumbClick = (crumbIndex) => {
    const newCurrentDirectoryPath = [];
    // home as the only crumb
    if (currentDirectoryPath.length < 1 && crumbIndex === 0) {
      return;
    }

    // home with other crumb
    if (currentDirectoryPath.length > 1 && crumbIndex === 0) {
      setCurrentDirectoryPath([]);
    }

    // last crumb
    if (currentDirectoryPath.length === crumbIndex) {
      return;
    }

    for (let i = 0; i < crumbIndex; i++) {
      newCurrentDirectoryPath.push(currentDirectoryPath[i]);
    }
    setCurrentDirectoryPath(newCurrentDirectoryPath);
  };

  return (
    <FilesList
      toggleIsFilesListVisible={toggleIsFilesListVisible}
      isFilesListVisible={isFilesListVisible}
      files={files}
      folders={folders}
      searchString={searchString}
      setSearchString={setSearchString}
      onFolderClick={onFolderClick}
      onFileClick={onFileClick}
      deleteFile={deleteFile}
      pendingFileUploads={pendingFileUploads}
      fileUploadErrors={fileUploadErrors}
      removeFileFromFileUploadErrors={removeFileFromFileUploadErrors}
    >
      {renderBreadcrumb()}
    </FilesList>
  );
};

export default FilesListContainer;
