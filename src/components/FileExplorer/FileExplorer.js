import React from "react";
import { useRef } from "react";
import { useContext } from "react";

import useOutsideClick from "../../hooks/useOutsideClick";
import useExcelToJson from "../../hooks/useExcelToJson";
import { AppContext } from "../../AppContext";

import File from "../File/File";

const FileExplorer = ({ setIsFileExplorerVisible, setJsonDataFile }) => {
  const { convertExcelFromS3ToJson } = useExcelToJson();
  const {
    files,
    folders,
    currentDirectoryPath,
    setCurrentDirectoryPath,
    getFile,
  } = useContext(AppContext);
  const ref = useRef();

  const closeTableIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );

  const closeFileExplorer = () => {
    setIsFileExplorerVisible(false);
  };
  const renderFiles = () => {
    return files.map((filename, index) => (
      <File
        type={"file"}
        text={filename}
        onClick={() => onFileClick(filename)}
        key={index}
      />
    ));
  };
  const renderFolders = () => {
    return folders.map((folder, index) => {
      return (
        <File
          type={"folder"}
          text={folder}
          onClick={() => {
            onFolderClick(folder);
          }}
          key={index}
        />
      );
    });
  };
  const renderBreadcrumb = () => {
    const currentDirectoryPathWithHome = ["Home", ...currentDirectoryPath];
    const breadcrumb = currentDirectoryPathWithHome.map((path, index) => {
      if (index < currentDirectoryPathWithHome.length - 1) {
        return (
          <li
            className="breadcrumb-item btn btn-link px-0 file-explorer__crumb"
            onClick={() => onCrumbClick(index)}
            key={index}
          >
            {/* <button className="btn btn-link" >{path}</button> */}
            {path}
          </li>
        );
      } else {
        return (
          <li
            className="breadcrumb-item btn btn-link disabled px-0 file-explorer__crumb"
            onClick={() => onCrumbClick(index)}
            key={index}
          >
            {path}
          </li>
        );
      }
    });
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb file-explorer__breadcrumb">{breadcrumb}</ol>
      </nav>
    );
  };
  const generateCurrentDirectoryPathString = () => {
    let currentDirectoryPathString = "";
    currentDirectoryPath.forEach((path) => {
      currentDirectoryPathString += path + "/";
    });
    return currentDirectoryPathString;
  };

  useOutsideClick(ref, () => {
    setIsFileExplorerVisible(false);
  });

  const onCrumbClick = (crumbIndex) => {
    console.log("onCrumbClick: " + crumbIndex);
    const newCurrentDirectoryPath = [];
    // home as the only crumb
    if (currentDirectoryPath.length < 1 && crumbIndex === 0) {
      console.log("did not do anything because home is the only crumb");
      return;
    }

    // home with other crumb
    if (currentDirectoryPath.length > 1 && crumbIndex === 0) {
      setCurrentDirectoryPath([]);
    }

    // last crumb
    if (currentDirectoryPath.length === crumbIndex) {
      console.log("did not do anything because this is the last crumb");
      return;
    }

    for (let i = 0; i < crumbIndex; i++) {
      newCurrentDirectoryPath.push(currentDirectoryPath[i]);
    }
    setCurrentDirectoryPath(newCurrentDirectoryPath);
  };

  const onFileClick = async (filename) => {
    console.log("onFileClick");
    let file = null;
    if (filename.includes(".csv") || filename.includes(".xlsx")) {
      file = await getFile(generateCurrentDirectoryPathString() + filename);
      setJsonDataFile(convertExcelFromS3ToJson(file.Body));
      setIsFileExplorerVisible(false);
    } else {
      console.log("did not do anything because file is not a csv");
      return;
    }
  };

  const onFolderClick = (folder) => {
    console.log("onFolderClick");
    setCurrentDirectoryPath([...currentDirectoryPath, folder]);
  };

  return (
    <div className="file-explorer">
      <div ref={ref} className="file-explorer__container">
        <div className="file-explorer__control">
          <button
            className="file-explorer__close-button btn btn-dark"
            onClick={closeFileExplorer}
          >
            {closeTableIcon}
          </button>
        </div>
        <div className="file-explorer__breadcrumb">{renderBreadcrumb()}</div>
        <div className="file-explorer__files-container">
          {renderFolders()}
          {renderFiles()}
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
