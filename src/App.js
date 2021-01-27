import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

import "./App.scss";
import { AppContext } from "./AppContext";

import QueryBox from "./components/QueryBox/QueryBox";
import MessagesContainer from "./components/MessagesContainer/MessagesContainer";
import UploadFile from "./components/UploadFile/UploadFile";
import SidebarItem from "./components/SidebarItem/SidebarItem";
import Submenu from "./components/Submenu/Submenu";
import Files from "./components/Files/Files";
import ContactToggle from "./components/ChatToggle/ContactToggle";
import ChatToggle from "./components/ChatToggle/ChatToggle";
import TableToggle from "./components/TableToggle/TableToggle";
import ColumnOptions from "./components/ColumnOptions/ColumnOptions";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import Header from "./components/Header/Header";
import Conversation from "./components/Conversation/Conversation";
import ThemeOptions from "./components/ThemeOptions/ThemeOptions";

import Sidebar from "./components/Sidebar/Sidebar";

import useAgTable from "./hooks/useAgTable";
import TableContainer from "./components/AgTable/TableContainer";
import FilesListContainer from "./components/FilesListContainer/FilesListContainer";
import Main from "./components/Main/Main";

import AppResponseDeleteThis from "./components/AppResponseDeleteThis/AppResponseDeleteThis";

// APP RESPONSES DELETE THIS
import Greeting from "./components/AppResponseDeleteThis/responses/resultGreeting.json";
import Records from "./components/AppResponseDeleteThis/responses/resultRecords.json";
import OneRecord from "./components/AppResponseDeleteThis/responses/resultOneRecord.json";
import Aggregations from "./components/AppResponseDeleteThis/responses/resultAggregations.json";
import Basic from "./components/AppResponseDeleteThis/responses/resultBasic.json";
import BasicDoc from "./components/AppResponseDeleteThis/responses/resultBasicDoc.json";
import BasicDocNested from "./components/AppResponseDeleteThis/responses/resultBasicDocNested.json";
// END APP RESPONSES

// APPMESSAGESTESTER DELETE THIS
import AppMessagesTester from "./components/AppMessageTester/AppMessageTester";
// END APPMESSAGESTESTER DELETE THIS

import useAppResponseProcessor from "./hooks/useAppResponseProcessor";
import useCognito from "./hooks/useCognito";
import SignOutButton from "./components/SignOutButton/SignOutButton";
import SignInFormContainer from "./components/SignInForm/SignInFormContainer";
import RegistrationFormContainer from "./components/RegistrationForm/RegistrationFormContainer";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import DeleteAccountButton from "./components/DeleteAccountButton/DeleteAccountButton";
import RightSidebarContainer from "./components/RightSidebar/RightSidebarContainer";
import AccountInfo from "./components/AccountInfo/AccountInfo";

import AWSAppSyncClient from "aws-appsync";
import AppSyncConfig from "./aws-exports";
import { API, Auth } from "aws-amplify";
import { createUser } from "./graphql/mutations";

// const client = new AWSAppSyncClient({
//   url: AppSyncConfig.graphqlEndpoint,
//   region: AppSyncConfig.region,
//   auth: {
//     type: AppSyncConfig.authenticationType,
//     jwtToken: async () =>
//       (await Auth.currentSession()).getIdToken().getJwtToken(), // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
//   },
// });

function App() {
  const {
    messages,
    setMessages,
    uploadedJsonFile,
    userSub,
    jsonDataFile,
    setJsonDataFile,
    uploadFileInputRef,
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
  } = useContext(AppContext);

  const {
    onGridReady,
    onColumnVisible,
    resetState,
    gridColumnApi,
    saveColumnState,
  } = useAgTable(jsonDataFile);

  const { getFlatJsonResult } = useAppResponseProcessor();

  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isTableToggleVisible, setIsTableToggleVisible] = useState(false);
  const [displayColumnsControl, setDisplayColumnsControl] = useState(false);
  const [isContactListVisible, setIsContactListVisible] = useState(false);
  const [isChatListVisible, setIsChatVisible] = useState(false);
  const [isFileExplorerVisible, setIsFileExplorerVisible] = useState(false);
  const [theme, setTheme] = useState("theme-two");
  const [isFilesListVisible, setIsFilesListVisible] = useState(false);
  const [isThemeOptionsVisible, setIsThemeOptionsVisible] = useState(false);
  const [page, setPage] = useState("login");

  useEffect(() => {
    const getToken = async () => {
      //const session = await Auth.currentSession();
      //console.log(session.getIdToken().getJwtToken());
      //console.log(registrationStatus, isLoggedIn, cognitoUser);
      const newuser = localStorage.getItem("usernew");
      if (registrationStatus === "verified" && isLoggedIn) {
        console.log(newuser);
        addUserToTable({
          id: userSub,
          cognitoId: userSub,
          registered: true,
          username: newuser,
        });
      }
    };
    getToken();
  }, [isLoggedIn]);

  async function addUserToTable(user) {
    try {
      const result = await API.graphql({
        query: createUser,
        variables: { ...user },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (jsonDataFile) {
      setIsTableVisible(true);
      setIsTableToggleVisible(true);
    } else {
      setIsTableVisible(false);
      setIsTableToggleVisible(false);
    }
  }, [jsonDataFile]);

  useEffect(() => {
    if (isTableVisible) {
      setDisplayColumnsControl(true);
    } else {
      setDisplayColumnsControl(false);
    }
  }, [isTableVisible]);

  // useEffect(() => {
  //   if (messages.length > 0 && messages[messages.length - 1].from === "user") {
  //     const lastUserMessage = messages[messages.length - 1];
  //     getResponseFromApp(lastUserMessage);
  //   }
  // }, [messages]);

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
    <TableContainer
      setIsTableVisible={setIsTableVisible}
      onGridReady={onGridReady}
      onColumnVisible={onColumnVisible}
    />
  ) : null;

  const tableToggleIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z" />
    </svg>
  );

  const themeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );

  const fileIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
      <g>
        <path d="M0,0h24v24H0V0z" fill="none" />
        <path
          className="svg-color"
          d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
        />
      </g>
    </svg>
  );

  const filesIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        className="svg-color"
        d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"
      />
    </svg>
  );

  const contactIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      width="18px"
      height="18px"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM4 0h16v2H4zm0 22h16v2H4zm8-10c1.38 0 2.5-1.12 2.5-2.5S13.38 7 12 7 9.5 8.12 9.5 9.5 10.62 12 12 12zm0-3.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 7.49C17 13.9 13.69 13 12 13s-5 .9-5 2.99V17h10v-1.01zm-8.19-.49c.61-.52 2.03-1 3.19-1 1.17 0 2.59.48 3.2 1H8.81z" />
    </svg>
  );

  const chatIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-chat-dots"
      viewBox="0 0 16 16"
    >
      <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M2.165 15.803l.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
    </svg>
  );

  const uploadSvgIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        className="svg-color"
        d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"
      />
    </svg>
  );

  const getResponseFromApp = (lastUserMessage) => {
    const lastUserMessageArray = lastUserMessage.text.split(" ");
    const command = lastUserMessageArray[0];
    const field = lastUserMessageArray[1];

    // send user message to bot
    // receive reply from bot

    if (command === "chart" && field) {
      if (isFileUploaded() && doesFieldExist(field)) {
        setMessages([
          ...messages,
          {
            from: "app",
            type: "data",
            text: null,
            data: getDataFromState(field),
          },
        ]);
      } else {
        setMessages([
          ...messages,
          {
            from: "app",
            type: "text",
            text:
              "command: " +
              command +
              " field: " +
              field +
              " existence: " +
              doesFieldExist(field).toString(),
          },
        ]);
      }
    } else if (command.includes("getrecords")) {
      setMessages([
        ...messages,
        {
          from: "app",
          type: "records",
          text: "getting records now",
          data: [
            {
              item: "jeans",
              quantityOnHand: 12,
              quantitySold: 20,
            },
            {
              item: "shirts",
              quantityOnHand: 34,
              quantitySold: 7,
            },
            {
              item: "ties",
              quantityOnHand: 28,
              quantitySold: 12,
            },
          ],
        },
      ]);
    } else if (command.includes("objectOne")) {
      const dataToSendOneLevel = {
        price: 9800000,
        area: 5750,
        bedrooms: 3,
        bathrooms: 2,
        stories: 4,
        mainroad: "yes",
        guestroom: "yes",
        basement: "no",
        hotwaterheating: "no",
        airconditioning: "yes",
        parking: 1,
        prefarea: "yes",
        furnishingstatus: "unfurnished",
      };
      setMessages([
        ...messages,
        {
          from: "app",
          type: "object",
          text: "oneLevelJson",
          data: dataToSendOneLevel,
        },
      ]);
    } else if (command.includes("objectTwo")) {
      const dataToSendTwoLevel = {
        price_maximum: {
          value: 13300000.0,
        },
      };
      setMessages([
        ...messages,
        {
          from: "app",
          type: "object",
          text: "oneLevelJson",
          data: dataToSendTwoLevel,
        },
      ]);
    } else if (command.includes("objectThree")) {
      const dataToSendTwoLevel = {
        propertyOne: {
          value: 13300000.0,
          bathrooms: 3,
        },
        propertyTwo: {
          value: 10000000.0,
          bathrooms: 4,
        },
      };
      setMessages([
        ...messages,
        {
          from: "app",
          type: "object",
          text: "oneLevelJson",
          data: dataToSendTwoLevel,
        },
      ]);
    } else if (command.includes("Basic")) {
      const appReply = getFlatJsonResult(Basic);
      console.log(appReply);
      setMessages([
        ...messages,
        {
          from: "app",
          type: "object",
          data: appReply,
        },
      ]);
    } else if (command.includes("Record")) {
      const appReply = getFlatJsonResult(OneRecord);
      console.log(appReply);
      setMessages([
        ...messages,
        {
          from: "app",
          type: "object",
          data: appReply,
        },
      ]);
    } else if (command.includes("Table")) {
      const appReply = getFlatJsonResult(Records);
      console.log(appReply);
      setMessages([
        ...messages,
        {
          from: "app",
          type: "table",
          data: appReply,
        },
      ]);
    } else if (command.includes("Aggregation")) {
      const appReply = getFlatJsonResult(Aggregations);
      console.log(appReply);
      setMessages([
        ...messages,
        { from: "app", type: "aggregation", data: appReply },
      ]);
    } else {
      setMessages([
        ...messages,
        { from: "app", type: "text", text: lastUserMessage.text },
      ]);
    }
  };

  const isFileUploaded = () => {
    if (uploadedJsonFile) {
      return true;
    } else {
      return false;
    }
  };

  const doesFieldExist = (fieldFromUserCommand) => {
    for (
      let i = 0;
      uploadedJsonFile && i < uploadedJsonFile.columnDefs.length;
      i++
    ) {
      if (
        uploadedJsonFile.columnDefs[i].field.trim().toLowerCase() ===
        fieldFromUserCommand.trim().toLowerCase()
      ) {
        return true;
      }
    }
    return false;
  };

  const getItemIdentifier = () => {
    let identifier = null;
    for (let i = 0; i < uploadedJsonFile.columnDefs.length; i++) {
      if (uploadedJsonFile.columnDefs[i].field.toLowerCase().includes("name")) {
        identifier = uploadedJsonFile.columnDefs[i].field;
        return identifier;
      }
    }
    identifier = uploadedJsonFile.columnDefs[0].field;
    return identifier;
  };

  const getFieldFromFieldFromUser = (fieldFromUserCommand) => {
    for (let i = 0; i < uploadedJsonFile.columnDefs.length; i++) {
      if (
        uploadedJsonFile.columnDefs[i].field.trim().toLowerCase() ===
        fieldFromUserCommand.trim().toLowerCase()
      ) {
        return uploadedJsonFile.columnDefs[i].field;
      }
    }
  };

  const getDataFromState = (fieldFromUser) => {
    const itemIdentifier = getItemIdentifier();
    const actualField = getFieldFromFieldFromUser(fieldFromUser);
    let itemIdentifierValuesArray = [];
    let itemDataArray = [];

    for (let i = 0; i < uploadedJsonFile.rowData.length; i++) {
      itemIdentifierValuesArray.push(
        uploadedJsonFile.rowData[i][itemIdentifier]
      );
    }

    for (let i = 0; i < uploadedJsonFile.rowData.length; i++) {
      itemDataArray.push(uploadedJsonFile.rowData[i][actualField]);
    }

    console.log(itemDataArray);

    return {
      labels: itemIdentifierValuesArray,
      datasets: [
        {
          label: itemIdentifier,
          data: itemDataArray,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "blue",
            "red",
            "green",
            "purple",
          ],
          borderWidth: 4,
        },
      ],
    };
  };

  const toggleIsFileExplorerVisible = () => {
    setIsFileExplorerVisible(!isFileExplorerVisible);
  };

  const toggleIsFilesListVisible = () => {
    setIsFilesListVisible(!isFilesListVisible);
  };

  const toggleIsThemeOptionsVisible = () => {
    setIsThemeOptionsVisible(!isThemeOptionsVisible);
  };

  const toggleIsTableVisible = () => {
    setIsTableVisible(!isTableVisible);
  };

  const toggleIsChatUserListVisible = () => {
    setIsContactListVisible(!isContactListVisible);
    setIsChatVisible(false);
    setIsFilesListVisible(false);
  };

  const toggleIsChatListVisible = () => {
    setIsChatVisible(!isChatListVisible);
    setIsContactListVisible(false);
    setIsFilesListVisible(false);
  };

  const displayRightSidebarContent = () => {
    if (rightSidebarContent === "settings") {
      return <div>Settings</div>;
    } else {
      return <AccountInfo username={username} />;
    }
  };

  const tableToggle = isTableToggleVisible ? (
    <SidebarItem
      icon={tableToggleIcon}
      clickHandler={toggleIsTableVisible}
      tooltipText={"toggle table"}
    />
  ) : null;

  const loginRegistration = () => {
    if (page !== "registration") {
      return <SignInFormContainer signIn={signIn} />;
    } else {
      return <RegistrationFormContainer />;
    }
  };

  return (
    <Router>
      <Route
        exact
        path="/"
        render={() => {
          if (isLoggedIn && username) {
            // console.log("Logged In");
            return (
              <div className={appClassWithTheme()}>
                {/* <AppMessagesTester /> */}
                {/* <DeleteAccountButton
                  deleteAccountHandler={() => deleteAccount()}
                /> */}
                <Header
                  username={
                    <div>
                      Welcome, <strong>{username}</strong>
                    </div>
                  }
                  signOutButton={<SignOutButton signOutHandler={signOut} />}
                  myProfileButton={
                    <button
                      className="btn btn-link text-white d-flex align-items-center"
                      onClick={() => toggleRightSidebarHandler("account-info")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={{ width: "24px", fill: "white" }}
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                      </svg>
                      <span>My Profile</span>
                    </button>
                  }
                  settingsButton={
                    <button
                      className="btn btn-link text-white d-flex align-items-center"
                      onClick={() => toggleRightSidebarHandler("settings")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="black"
                        style={{ width: "24px", fill: "white" }}
                      >
                        <g>
                          <path d="M0,0h24v24H0V0z" fill="none"></path>
                          <path
                            className="svg-color"
                            d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
                          ></path>
                        </g>
                      </svg>
                      <span>Settings</span>
                    </button>
                  }
                />
                <Sidebar>
                  <SidebarItem
                    icon={uploadSvgIcon}
                    clickHandler={() => {
                      uploadFileInputRef.current.click();
                    }}
                    tooltipText={"upload"}
                  />
                  <SidebarItem
                    icon={filesIcon}
                    clickHandler={toggleIsFilesListVisible}
                    tooltipText={"files"}
                  />
                  <SidebarItem
                    icon={contactIcon}
                    tooltipText={"contacts"}
                    clickHandler={toggleIsChatUserListVisible}
                  />
                  <SidebarItem
                    icon={chatIcon}
                    tooltipText={"chat"}
                    clickHandler={toggleIsChatListVisible}
                  />
                </Sidebar>
                {tableToggle}
                <SidebarItem
                  position={"bottom"}
                  icon={fileIcon}
                  clickHandler={() => {
                    toggleIsThemeOptionsVisible();
                  }}
                  tooltipText={"themes"}
                />
                <RightSidebarContainer
                  isRightSidebarOpen={isRightSidebarOpen}
                  toggleRightSidebar={toggleRightSidebar}
                  rightSidebarContent={displayRightSidebarContent()}
                />
                <Main>
                  <UploadFile />
                  <FilesListContainer
                    isFilesListVisible={isFilesListVisible}
                    toggleIsFilesListVisible={toggleIsFilesListVisible}
                  />
                  <ContactToggle
                    isContactListVisible={isContactListVisible}
                    toggleIsChatUserListVisible={toggleIsChatUserListVisible}
                    username={username}
                  />
                  <ChatToggle
                    isChatListVisible={isChatListVisible}
                    toggleIsChatListVisible={toggleIsChatListVisible}
                  />
                  <ThemeOptions
                    setTheme={setTheme}
                    theme={theme}
                    isThemeOptionsVisible={isThemeOptionsVisible}
                    toggleIsThemeOptionsVisible={toggleIsThemeOptionsVisible}
                  />
                  <Conversation>
                    {tableContainer}
                    <MessagesContainer></MessagesContainer>
                    <QueryBox
                      pushChat={pushChat}
                      username={username}
                      botName={botName}
                      botAlias={botAlias}
                    ></QueryBox>
                  </Conversation>
                </Main>
              </div>
            );
          } else {
            return <Redirect to="/sign-in" />;
          }
        }}
      />

      <Route
        path="/sign-in"
        render={() => {
          if (isLoggedIn && username) {
            return <Redirect to="/" />;
          }
          if (registrationStatus === "verifying") {
            return <Redirect to="/register" />;
          }
          return <SignInFormContainer signIn={signIn} />;
        }}
      />

      <Route
        path="/register"
        render={() => {
          if (isLoggedIn && username) {
            return <Redirect to="/" />;
          }
          return (
            <RegistrationFormContainer
              register={register}
              verifyAccount={verifyAccount}
              registrationStatus={registrationStatus}
            />
          );
        }}
      />

      <Route
        path="/"
        render={() => {
          if (isLoggedIn && username) {
            return <Redirect to="/" />;
          } else {
            return <Redirect to="/sign-in" />;
          }
        }}
      />
    </Router>
  );

  return (
    <div>
      {isLoggedIn && username ? (
        <div className={appClassWithTheme()}>
          <AppMessagesTester />
          <Header
            username={
              <div>
                Welcome, <strong>{username}</strong>
              </div>
            }
            signOutButton={<SignOutButton signOutHandler={signOut} />}
          />
          <Sidebar>
            <SidebarItem
              icon={uploadSvgIcon}
              clickHandler={() => {
                uploadFileInputRef.current.click();
              }}
              tooltipText={"upload"}
            />
            <SidebarItem
              icon={filesIcon}
              clickHandler={toggleIsFilesListVisible}
              tooltipText={"files"}
            />
            {tableToggle}
            <SidebarItem
              position={"bottom"}
              icon={fileIcon}
              clickHandler={() => {
                toggleIsThemeOptionsVisible();
              }}
              tooltipText={"themes"}
            />
          </Sidebar>
          <Main>
            <UploadFile />
            <FilesListContainer
              isFilesListVisible={isFilesListVisible}
              toggleIsFilesListVisible={toggleIsFilesListVisible}
            />
            <ThemeOptions
              setTheme={setTheme}
              theme={theme}
              isThemeOptionsVisible={isThemeOptionsVisible}
              toggleIsThemeOptionsVisible={toggleIsThemeOptionsVisible}
            />
            <Conversation>
              {tableContainer}
              <MessagesContainer></MessagesContainer>
              <QueryBox></QueryBox>
            </Conversation>
          </Main>
        </div>
      ) : (
        loginRegistration()
      )}
    </div>
  );
}

export default App;
