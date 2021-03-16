import React, { useState, useContext, useEffect, useRef } from "react";

import { AppContext } from "../../AppContext";

import { FileUploadContext } from "../../FileUploadContext";

import MessagesContainer from "../MessagesContainer/MessagesContainer";
import Conversation from "../Conversation/Conversation";
import FilePreviewTable from "../FilePreviewTable/FilePreviewTable";
import useAgTable from "../../hooks/useAgTable";
import SignOutButton from "../SignOutButton/SignOutButton";
import AccountInfo from "../AccountInfo/AccountInfo";
import Header from "../Header/Header";
import HeaderItem from "../Header/HeaderItem/HeaderItem";
import Dropdown from "../Header/Dropdown/Dropdown";
import ButtonIconLink from "../ButtonIconLink/ButtonIconLink";
import RightSidebar from "../RightSidebar/RightSidebar";
import Sidebar from "../Sidebar/Sidebar";
import SidebarItem from "../SidebarItem/SidebarItem";
import Main from "../Main/Main";
import UploadFile from "../UploadFile/UploadFile";
import FilesListContainer from "../FilesListContainer/FilesListContainer";
import QueryBox from "../QueryBox/QueryBox";
import OptionsList from "../OptionsList/OptionsList";
import AlertModal from "../AlertModal/AlertModal";
import TimeoutPrompt from "../TimeoutPrompt/TimeoutPrompt";
import ContactToggle from "../ChatToggle/ContactToggle";
import ChatToggle from "../ChatToggle/ChatToggle";

import AppMessageTester from "../AppMessageTester/AppMessageTester";
import DeleteAccountButton from "../DeleteAccountButton/DeleteAccountButton";

import {
  tableToggleIcon,
  filesIcon,
  uploadSvgIcon,
  userProfileIcon,
  gearIcon,
  caretDownIcon,
  contactIcon,
  chatIcon,
} from "../../Icons/Icons";

import { useIdleTimer } from "react-idle-timer";
import ChangePasswordContainer from "../ChangePassword/ChangePasswordContainer";
import useConfig from "../../hooks/useConfig";
import FileUploadToast from "../FileUploadToast/FileUploadToast";
import Tour from "../Tour/Tour";

const ChatApp = () => {
  const {
    email,
    setMessages,
    signOut,
    pushChat,
    username,
    botName,
    botAlias,
    isRightSidebarOpen,
    setIsRightSidebarOpen,
    rightSidebarContent,
    setRightSidebarContent,
    files,
    resetLoginAttempts,
    getLoginAttempts,
    deleteAccount,
    pendingFileUploads,
    fileUploadErrors,
  } = useContext(AppContext);

  const fileUploadContext = useContext(FileUploadContext);

  const {
    sessionTimeOutInMinutes,
    sessionTimeOutMessage,
    forceLogoutAfterTimeOutInMinutes,
    maxFileUploadCount,
    maxFileUploadSizeInKb,
    surveyUrl,
  } = useConfig().app;

  const sessionTimeoutTime = 1000 * 60 * sessionTimeOutInMinutes || 1000 * 60 * 20;
  const forceLogoutTime = 1000 * 60 * forceLogoutAfterTimeOutInMinutes || 1000 * 60 * 2;

  const signOutTimer = useRef();

  const handleOnIdle = (event) => {
    setIsUserTimedOut(true);
    console.log("user timed out signing off in 10 seconds");
    clearTimeout(signOutTimer.current);
    signOutTimer.current = setTimeout(() => signOutHandler(true), forceLogoutTime);
  };

  const stayLoggedInClickHandler = () => {
    console.log("user chose to stay logged in. waiting to time out again");
    clearTimeout(signOutTimer.current);
    setIsUserTimedOut(false);
  };

  const { getLastActiveTime, getRemainingTime } = useIdleTimer({
    timeout: sessionTimeoutTime,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  const [isUserTimedOut, setIsUserTimedOut] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isTableToggleVisible, setIsTableToggleVisible] = useState(false);
  const [theme, setTheme] = useState("theme-two");
  const [isFilesListVisible, setIsFilesListVisible] = useState(false);
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState("");
  const [isFileUploadToastOpen, setIsFileUploadToastOpen] = useState(false);
  const [fileUploadStatus, setFileUploadStatus] = useState("idle");
  /* Chat app*/
  const [isContactListVisible, setIsContactListVisible] = useState(false);
  const [isChatListVisible, setIsChatVisible] = useState(false);

  const THEMES = [
    { name: "default", value: "default" },
    { name: "Theme One", value: "theme-one" },
    { name: "Theme Two", value: "theme-two" },
    { name: "Theme Three", value: "theme-three" },
  ];

  const appClassWithTheme = () => {
    if (theme === "theme-one") {
      return "app app--theme-one";
    } else if (theme === "theme-two") {
      return "app app--theme-two";
    } else if (theme === "theme-three") {
      return "app app--theme-three";
    } else {
      return "app";
    }
  };

  const tableContainer = isTableVisible ? (
    <FilePreviewTable setIsTableVisible={setIsTableVisible} setIsTableToggleVisible={setIsTableToggleVisible} />
  ) : null;

  const openFilesList = () => {
    setIsFilesListVisible(true);
    setIsHeaderDropdownOpen(false);
    setIsRightSidebarOpen(false);
    setIsChatVisible(false);
    setIsContactListVisible(false);
  };

  const closeFilesList = () => {
    setIsFilesListVisible(false);
  };

  const openChatUserList = () => {
    setIsContactListVisible(true);
    setIsChatVisible(false);
    setIsFilesListVisible(false);
    setIsRightSidebarOpen(false);
  };

  const closeChatUserList = () => {
    setIsContactListVisible(false);
  };

  const openChatList = () => {
    setIsChatVisible(true);
    setIsContactListVisible(false);
    setIsFilesListVisible(false);
    setIsRightSidebarOpen(false);
  };

  const closeChatList = () => {
    setIsChatVisible(false);
  };

  const sidebarFilesListClickHandler = () => {
    if (isFilesListVisible) {
      closeFilesList();
    } else {
      openFilesList();
    }
  };

  const sidebarChatUserListClickHandler = () => {
    if (isContactListVisible) {
      closeChatUserList();
    } else {
      openChatUserList();
    }
  };

  const sidebarChatListClickHandler = () => {
    if (isChatListVisible) {
      closeChatList();
    } else {
      openChatList();
    }
  };

  const closeRightSidebar = () => {
    setIsRightSidebarOpen(false);
  };

  const handleFileUploadButtonClick = () => {
    if (isMaxFileUploadCountReached()) {
      fileUploadContext.triggerInputClick();
    } else {
      setIsAlertModalVisible(true);
      setAlertModalMessage("You have reached the limit for uploading files");
    }
  };

  const isMaxFileUploadCountReached = () => {
    return files.length < maxFileUploadCount ? true : false;
  };

  const toggleIsTableVisible = () => {
    setIsTableVisible(!isTableVisible);
  };

  const displayRightSidebarContent = () => {
    if (rightSidebarContent === "settings") {
      return (
        <div>
          <div className="text-center font-weight-bold">Settings</div>
          <OptionsList title={"Themes"} setOption={setTheme} selectedOptionValue={theme} options={THEMES} />
          <a href={surveyUrl} target="_blank" className="btn btn-primary">
            Feedback
          </a>
        </div>
      );
    } else if (rightSidebarContent === "profile") {
      return <AccountInfo username={username} email={email} openChangePassword={changePasswordClickHandler} />;
    } else if (rightSidebarContent === "change-password") {
      return <ChangePasswordContainer closeRightSidebar={closeRightSidebar} />;
    }
  };

  const changePasswordClickHandler = () => {
    closeFilesList();
    closeChatUserList();
    closeChatList();
    setIsHeaderDropdownOpen(false);
    setIsRightSidebarOpen(true);
    setRightSidebarContent("change-password");
  };

  const myProfileClickHandler = () => {
    closeFilesList();
    closeChatUserList();
    closeChatList();
    setIsHeaderDropdownOpen(false);
    setIsRightSidebarOpen(true);
    setRightSidebarContent("profile");
  };

  const settingsClickHandler = () => {
    closeFilesList();
    closeChatUserList();
    closeChatList();
    setIsHeaderDropdownOpen(false);
    setIsRightSidebarOpen(true);
    setRightSidebarContent("settings");
  };

  const openFileUploadToast = (fileUploadStatus) => {
    setIsFileUploadToastOpen(true);
    setFileUploadStatus(fileUploadStatus);
  };

  const closeFileUploadToast = () => {
    setIsFileUploadToastOpen(false);
  };

  const hasPendingFileUploads = () => {
    return pendingFileUploads.length > 0 ? true : false;
  };

  const isFileUploadStatusUploading = () => {
    return fileUploadStatus === "uploading" ? true : false;
  };

  const hasFileUploadErrors = () => {
    return fileUploadErrors.length > 0 ? true : false;
  };

  const tableToggle = isTableToggleVisible ? (
    <SidebarItem icon={tableToggleIcon} clickHandler={toggleIsTableVisible} tooltipText={"toggle table"} />
  ) : null;

  const alertModal = isAlertModalVisible ? (
    <AlertModal close={() => setIsAlertModalVisible(false)} message={alertModalMessage} />
  ) : null;

  const signOutHandler = (shouldPreserveMessages) => {
    if (shouldPreserveMessages === true) {
      // no op
    } else {
      setMessages([]);
      localStorage.removeItem("transcript");
      // console.log("user got forcefully logged out");
    }
    clearTimeout(signOutTimer.current);
    signOut();
  };

  const timeoutPrompt = isUserTimedOut ? (
    <TimeoutPrompt
      stayLoggedInHandler={stayLoggedInClickHandler}
      signOutHandler={() => signOutHandler()}
      message={sessionTimeOutMessage}
    />
  ) : null;

  const fileUploadToast = isFileUploadToastOpen ? (
    <FileUploadToast closeFileUploadToast={closeFileUploadToast} status={fileUploadStatus} />
  ) : null;

  // successfull login should clear login attempts
  useEffect(() => {
    if (getLoginAttempts(username) !== 0) {
      resetLoginAttempts(username);
    }
  }, []);

  // show table when excel has been converted into json
  useEffect(() => {
    if (fileUploadContext.jsonData) {
      setIsTableVisible(true);
      setIsTableToggleVisible(true);
    } else {
      setIsTableVisible(false);
      setIsTableToggleVisible(false);
    }
  }, [fileUploadContext.jsonData]);

  // fileupload toast
  useEffect(() => {
    if (hasPendingFileUploads()) {
      openFileUploadToast("uploading");
    }

    if (!hasPendingFileUploads()) {
      if (isFileUploadStatusUploading() && !hasFileUploadErrors()) {
        openFileUploadToast("success");
      } else if (hasFileUploadErrors()) {
        openFileUploadToast("fail");
      }
    }
  }, [pendingFileUploads, fileUploadErrors]);

  return (
    <div className={appClassWithTheme()}>
      {alertModal}
      {timeoutPrompt}
      <Header username={username} theme={theme}>
        <HeaderItem>
          <div>
            Welcome, <strong>{username}</strong>
          </div>
        </HeaderItem>
        <HeaderItem>
          <Dropdown
            isActive={isHeaderDropdownOpen}
            setIsActive={setIsHeaderDropdownOpen}
            toggle={
              <button className="dropdown__toggle btn btn-secondary">
                <span>Account</span>
                {caretDownIcon}
              </button>
            }
          >
            <ButtonIconLink
              clickHandler={() => myProfileClickHandler("profile")}
              icon={userProfileIcon}
              text={"My Profile"}
            />
            <ButtonIconLink clickHandler={() => settingsClickHandler("settings")} icon={gearIcon} text={"Settings"} />
            <Tour />
            <SignOutButton
              signOutHandler={() => {
                signOutHandler();
                localStorage.removeItem("transcript");
              }}
            />
          </Dropdown>
        </HeaderItem>
        <RightSidebar
          isMobile={true}
          isRightSidebarOpen={isRightSidebarOpen}
          closeRightSidebar={closeRightSidebar}
          rightSidebarContent={displayRightSidebarContent()}
        />
      </Header>
      <Sidebar>
        <SidebarItem icon={uploadSvgIcon} clickHandler={handleFileUploadButtonClick} tooltipText={"upload"} />
        <SidebarItem icon={filesIcon} clickHandler={sidebarFilesListClickHandler} tooltipText={"files"} />
        {tableToggle}
        <SidebarItem icon={contactIcon} tooltipText={"contacts"} clickHandler={sidebarChatUserListClickHandler} />
        <SidebarItem icon={chatIcon} tooltipText={"chat"} clickHandler={sidebarChatListClickHandler} />
      </Sidebar>
      <Main>
        {/* <DeleteAccountButton deleteAccountHandler={deleteAccount} />
        <AppMessageTester /> */}
        {fileUploadToast}
        <UploadFile />
        <FilesListContainer isFilesListVisible={isFilesListVisible} toggleIsFilesListVisible={closeFilesList} />
        <ContactToggle
          isContactListVisible={isContactListVisible}
          toggleIsChatUserListVisible={closeChatUserList}
          username={username}
          toggleIsChatListVisible={openChatList}
        />
        <ChatToggle isChatListVisible={isChatListVisible} toggleIsChatListVisible={closeChatList} />
        <Conversation>
          {tableContainer}
          <MessagesContainer></MessagesContainer>
          <QueryBox pushChat={pushChat} username={username} botName={botName} botAlias={botAlias}></QueryBox>
        </Conversation>
        <RightSidebar
          isRightSidebarOpen={isRightSidebarOpen}
          closeRightSidebar={closeRightSidebar}
          rightSidebarContent={displayRightSidebarContent()}
        />
      </Main>
    </div>
  );
};

export default ChatApp;
