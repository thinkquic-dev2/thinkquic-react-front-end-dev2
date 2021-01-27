import React, { useRef } from "react";
import useUploadedJsonFiles from "./hooks/useUploadedJsonFiles";
import useQueries from "./hooks/useQueries";
import useMessages from "./hooks/useMessages";
import useFiles from "./hooks/useFiles";
import useExcelToJson from "./hooks/useExcelToJson";
import { useState } from "react";
import useCognito from "./hooks/useCognito";

export const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const { uploadedJsonFile, setUploadedJsonFile } = useUploadedJsonFiles();
  const { queries, setQueries } = useQueries();
  const { messages, setMessages } = useMessages();
  const { convertExcelToJson } = useExcelToJson();
  const [rawDataFile, setRawDataFile] = useState();
  const [jsonDataFile, setJsonDataFile] = useState();
  const {
    signIn,
    signOut,
    register,
    deleteAccount,
    verifyAccount,
    pushChat,
    registrationStatus,
    isLoggedIn,
    username,
    botName,
    botAlias,
    s3,
    isFileExplorerEnabled,
    albumBucketName,
    uploadPath,
    cognitoUser,
    userSub,
  } = useCognito({ setMessages });
  const {
    files,
    folders,
    currentDirectoryPath,
    getFolderContents,
    uploadFile,
    setCurrentDirectoryPath,
    getFile,
  } = useFiles({ s3, albumBucketName, uploadPath, isFileExplorerEnabled });
  const uploadFileInputRef = useRef();
  const [uploadFileInput, setUploadFileInput] = useState(null);
  const [isUploadButtonEnabled, setIsUploadButtonEnabled] = useState(false);
  const handleFileSelection = () => {
    const filesList = uploadFileInputRef.current.files;
    let fileObjects = [];
    for (let i = 0, numFiles = filesList.length; i < numFiles; i++) {
      fileObjects.push(filesList[i]);
    }
    convertExcelToJson(fileObjects, setJsonDataFile);
    setIsUploadButtonEnabled(true);
  };
  const resetFileInputRefValue = () => {
    uploadFileInputRef.current.value = null;
    setIsUploadButtonEnabled(false);
  };
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [rightSidebarContent, setRightSidebarContent] = useState(
    "account-info"
  );
  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };
  const toggleRightSidebarHandler = (sidebarContent) => {
    toggleRightSidebar();
    setRightSidebarContent(sidebarContent);
  };

  return (
    <AppContext.Provider
      value={{
        uploadedJsonFile,
        setUploadedJsonFile,
        queries,
        setQueries,
        userSub,
        messages,
        setMessages,
        files,
        folders,
        currentDirectoryPath,
        getFolderContents,
        uploadFile,
        setCurrentDirectoryPath,
        getFile,
        uploadFileInputRef,
        uploadFileInput,
        setUploadFileInput,
        rawDataFile,
        setRawDataFile,
        jsonDataFile,
        setJsonDataFile,
        handleFileSelection,
        resetFileInputRefValue,
        isUploadButtonEnabled,
        setIsUploadButtonEnabled,
        signIn,
        signOut,
        register,
        deleteAccount,
        verifyAccount,
        pushChat,
        registrationStatus,
        isLoggedIn,
        username,
        botName,
        botAlias,
        isRightSidebarOpen,
        toggleRightSidebar,
        rightSidebarContent,
        setRightSidebarContent,
        toggleRightSidebarHandler,
        cognitoUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
