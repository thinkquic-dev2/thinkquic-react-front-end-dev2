import React, { useRef } from "react";
import useMessages from "./hooks/useMessages";
import useFiles from "./hooks/useFiles";
import useExcelToJson from "./hooks/useExcelToJson";
import { useState } from "react";
import useLoginAttempts from "./hooks/useLoginAttempts";

import useCognito from "./hooks/useCognito";
import useS3 from "./hooks/useS3";
import useLex from "./hooks/useLex";

export const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const { messages, setMessages, isPreviousMessagesLoaded } = useMessages();

  const { convertExcelToJson } = useExcelToJson();

  const [rawDataFile, setRawDataFile] = useState();

  const [jsonDataFile, setJsonDataFile] = useState();

  const { getLoginAttempts, incrementLoginAttempts, resetLoginAttempts } = useLoginAttempts();

  const [allUsers, setAllUsers] = useState([]);

  const [conId, setConId] = useState("");

  const [isWaiting, setIsWaiting] = useState(false);

  const {
    signIn,
    signOut,
    register,
    deleteAccount,
    verifyAccount,
    registrationStatus,
    isLoggedIn,
    username,
    email,
    userIdleTime,
    resetPassword,
    confirmPassword,
    cognitoUser,
    currentUser,
    userSub,
  } = useCognito({ setMessages });

  const { pushChat, botName, botAlias } = useLex({ username });

  const { s3 } = useS3({ isLoggedIn });

  const {
    files,
    folders,
    currentDirectoryPath,
    getFolderContents,
    uploadFile,
    setCurrentDirectoryPath,
    getFile,
    deleteFile,
    pendingFileUploads,
    fileUploadErrors,
    removeFileFromFileUploadErrors,
    maxFileUpload,
  } = useFiles({ s3, username });

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

  const [rightSidebarContent, setRightSidebarContent] = useState("account-info");

  return (
    <AppContext.Provider
      value={{
        messages,
        isPreviousMessagesLoaded,
        setMessages,
        files,
        folders,
        currentDirectoryPath,
        getFolderContents,
        uploadFile,
        setCurrentDirectoryPath,
        getFile,
        deleteFile,
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
        email,
        botName,
        botAlias,
        isRightSidebarOpen,
        rightSidebarContent,
        setRightSidebarContent,
        setIsRightSidebarOpen,
        maxFileUpload,
        userIdleTime,
        resetPassword,
        confirmPassword,
        getLoginAttempts,
        incrementLoginAttempts,
        resetLoginAttempts,
        pendingFileUploads,
        fileUploadErrors,
        removeFileFromFileUploadErrors,
        userSub,
        cognitoUser,
        currentUser,
        allUsers,
        setAllUsers,
        conId,
        setConId,
        isWaiting,
        setIsWaiting,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
