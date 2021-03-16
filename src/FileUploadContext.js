import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import useExcelToJson from "./hooks/useExcelToJson";
import { AppContext } from "./AppContext";

export const FileUploadContext = createContext();

const FileUploadContextProvider = ({ children }) => {
  const fileInputRef = useRef();
  const excelToJsonConverter = useExcelToJson();
  const appContext = useContext(AppContext);
  const [filename, setFilename] = useState(null);
  const [isFileFromS3, setIsFileFromS3] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [isExcelConverted, setIsExcelConverted] = useState(false);
  const [uploadStatus, setUploadStatus] = useState();

  const handleFileInputChange = (inputField) => {
    const fileObjects = getFileObjects(inputField.files);
    excelToJsonConverter.convertExcelToJson(fileObjects, setJsonData);
    setFilename(inputField.files[0].name);
  };

  const triggerInputClick = () => {
    clearFileUploadData();
    fileInputRef.current.click();
  };

  const getFileObjects = (files) => {
    const numFiles = files.length;
    let fileObjects = [];
    for (let i = 0; i < numFiles; i++) {
      fileObjects.push(files[i]);
    }
    return fileObjects;
  };

  const getFileName = () => {
    return filename;
  };

  const clearFileInput = () => {
    fileInputRef.current.value = null;
  };

  const clearJsonData = () => {
    setJsonData(null);
  };

  const clearFilename = () => {
    setFilename(null);
  };

  const clearIsFileFromS3 = () => {
    setIsFileFromS3(false);
  };

  const resetUploadStatus = () => {
    setUploadStatus();
  };

  const uploadFile = () => {
    const file = fileInputRef.current.files[0];
    appContext.uploadFile(file, appContext.username, setUploadStatus);
  };

  const clearFileUploadData = () => {
    clearJsonData();
    clearFileInput();
    resetUploadStatus();
    clearFilename();
    clearIsFileFromS3();
  };

  const handleS3FilePreview = (fileBody, filename) => {
    clearFileUploadData();
    setJsonData(excelToJsonConverter.convertExcelFromS3ToJson(fileBody));
    setFilename(filename);
    setIsFileFromS3(true);
  };

  useEffect(() => {
    if (jsonData) {
      setIsExcelConverted(true);
    }
  }, [jsonData]);

  return (
    <FileUploadContext.Provider
      value={{
        fileInputRef,
        isExcelConverted,
        jsonData,
        uploadStatus,
        filename,
        isFileFromS3,
        triggerInputClick,
        handleFileInputChange,
        getFileName,
        uploadFile,
        clearFileUploadData,
        handleS3FilePreview,
      }}
    >
      {children}
    </FileUploadContext.Provider>
  );
};

export default FileUploadContextProvider;
