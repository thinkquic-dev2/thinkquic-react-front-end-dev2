import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk";
import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { useEffect, useState, useRef } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";

import { createUser } from "../graphql/mutations";

const useCognito = ({ setMessages }) => {
  const [username, setUsername] = useState(null);
  const [userSub, setUserSub] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState("not started");
  const [cognitoUser, setCognitoUser] = useState(null);
  const [userPoolId, setUserPoolId] = useState();
  const [clientId, setClientId] = useState();
  const [poolData, setPoolData] = useState();
  const [userPool, setUserPool] = useState();
  const [idToken, setIdToken] = useState();
  const [region, setRegion] = useState();
  const [identityPoolId, setIdentityPoolId] = useState();
  const [botName, setBotName] = useState();
  const [bucketRegion, setBucketRegion] = useState();
  const [albumBucketName, setAlbumBucketName] = useState();
  const [bucketVersionNumber, setBucketVersionNumber] = useState();
  const [botAlias, setBotAlias] = useState();
  const [uploadPath, setUploadPath] = useState();
  const [isFileExplorerEnabled, setIsFileExplorerEnabled] = useState(false);
  const [s3, setS3] = useState();

  const sessionAttributes = useRef({});

  // Fetch Config
  useEffect(() => {
    const fetchConfig = async () => {
      // const configJson = await fetch("/app-config.json");
      // const config = await configJson.json();
      // console.log("in fetchConfig");
      // console.log(config);

      const config = window["appConfig"];

      const localPoolData = {
        UserPoolId: config.cognito.UserPoolId,
        ClientId: config.cognito.ClientId,
      };

      const localUserPool = new AmazonCognitoIdentity.CognitoUserPool(
        localPoolData
      );

      setBucketRegion(config.s3.bucketRegion);
      setAlbumBucketName(config.s3.albumBucketName);
      setBucketVersionNumber(config.s3.bucketVersionNumber);
      setUploadPath(config.s3.uploadPath);
      setIsFileExplorerEnabled(config.s3.isFileExplorerEnabled);

      setRegion(config.cognito.region);
      setIdentityPoolId(config.cognito.identityPoolId);
      setUserPoolId(config.cognito.UserPoolId);
      setClientId(config.cognito.ClientId);
      setPoolData(localPoolData);
      setUserPool(localUserPool);
      setBotName(config.lex.botName);
      setBotAlias(config.lex.botAlias);
    };
    fetchConfig();
  }, []);

  // Determine if user is logged in
  useEffect(() => {
    if (userPool) {
      getCurrentLoggedInSession();
    }
  }, [userPool, region, identityPoolId]);

  // Create an S3 instance
  useEffect(() => {
    if (idToken && albumBucketName && bucketVersionNumber && bucketRegion) {
      setS3(
        new AWS.S3({
          apiVersion: bucketVersionNumber,
          params: { Bucket: albumBucketName },
        })
      );
    }
  }, [idToken, albumBucketName, bucketRegion, bucketVersionNumber]);

  const signIn = (username, password, errorCallback) => {
    var authenticationData = {
      Username: username,
      Password: password,
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );

    var userData = {
      Username: username,
      Pool: userPool,
    };

    let localCognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    setCognitoUser(localCognitoUser);

    localCognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();

        //POTENTIAL: Region needs to be set if not already set previously elsewhere.
        AWS.config.region = region;

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: identityPoolId, // your identity pool id here

          Logins: {
            // Change the key below according to the specific region your user pool is in.
            ["cognito-idp." +
            region +
            ".amazonaws.com/" +
            userPoolId]: result.getIdToken().getJwtToken(),
          },
        });

        //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
        AWS.config.credentials.refresh((error) => {
          if (error) {
            console.log("Here");
            console.error(error);
          } else {
            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();
            setIsLoggedIn(true);
            setCurrentUser(localCognitoUser);
            setUsername(localCognitoUser.username);
          }
        });
      },

      onFailure: function (err) {
        // alert(err.message || JSON.stringify(err));
        if (err.code === "UserNotConfirmedException") {
          setRegistrationStatus("verifying");
        } else {
          errorCallback(err);
        }
      },
    });
  };

  const signOut = () => {
    cognitoUser.signOut();
    setCognitoUser(null);
    setCurrentUser(null);
    setIsLoggedIn(false);
    setUsername(null);
    setRegistrationStatus("not started");
    setMessages([]);
  };

  function getCurrentLoggedInSession() {
    let localCognitoUser = userPool.getCurrentUser();
    setCognitoUser(localCognitoUser);

    if (localCognitoUser != null) {
      localCognitoUser.getSession(function (err, session) {
        if (err) {
          console.log(err.message);
        } else {
          const localIdToken = session.getIdToken().getJwtToken();
          setIdToken(localIdToken);
          getCognitoIdentityCredentials(localCognitoUser, localIdToken);
        }
      });
    } else {
      console.log("Session expired. Please log in again.");
    }
  }

  function getCognitoIdentityCredentials(cognitoUser, idToken) {
    AWS.config.region = region;

    var loginMap = {};
    loginMap[
      "cognito-idp." + region + ".amazonaws.com/" + userPoolId
    ] = idToken;

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: identityPoolId,
      Logins: loginMap,
    });

    AWS.config.credentials.clearCachedId();

    AWS.config.credentials.get(function (err) {
      if (err) {
        console.log(err.message);
      } else {
        setIsLoggedIn(true);
        setCurrentUser(cognitoUser);
        setUsername(cognitoUser.getUsername());
      }
    });
  }

  function register(
    email,
    username,
    password,
    passwordConfirmation,
    errorCallback
  ) {
    var attributeList = [];

    var dataEmail = {
      Name: "email",
      Value: email,
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataEmail
    );

    attributeList.push(attributeEmail);

    userPool.signUp(
      username,
      password,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          console.log(err.message);
          errorCallback(err);
        } else {
          console.log(result);
          setCognitoUser(result.user);
          setUserSub(result.userSub);
          setRegistrationStatus("verifying");
        }
      }
    );
  }

  function deleteAccount() {
    cognitoUser.deleteUser(function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log("call result: " + result);
      localStorage.clear();
      signOut();
    });
  }

  function verifyAccount(verificationCode) {
    console.log(cognitoUser);
    cognitoUser.confirmRegistration(
      verificationCode,
      true,
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("Account Verified", result);
          localStorage.setItem("usernew", cognitoUser.username);
          setRegistrationStatus("verified");
          console.log(registrationStatus, isLoggedIn, cognitoUser);
        }
      }
    );
  }

  async function addUserToTable(user) {
    console.log(username);
    try {
      const result = await API.graphql({
        query: createUser,
        variables: { input: user },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
  // const CreateUser = async () => {
  //   const result = {
  //     id: CognitoUser.idToken,
  //     username: CognitoUser.username,
  //     registered: CognitoUser.true,
  //     cognitoId: CognitoUser.idToken,
  //   };
  //   try {
  //     await API.graphql(
  //       graphqlOperation(mutations.createUser, { input: result })
  //     );
  //     console.log("user created");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  function pushChat(text, callback) {
    if (!username) {
      return;
    }

    window.lexruntime = window.lexruntime || new AWS.LexRuntime();
    var lexruntime = window.lexruntime;

    // send it to the Lex runtime
    var params = {
      botAlias: botAlias,
      botName: botName,
      inputText: text,
      userId: username,
      sessionAttributes: sessionAttributes.current,
    };

    lexruntime.postText(params, function (err, data) {
      if (err) {
        console.log(err);
        callback("Oops something went wrong");
        return;
      }
      if (data) {
        sessionAttributes.current = data.sessionAttributes;
        // capture the sessionAttributes for the next cycle
        // show response and/or error/dialog status
        const filteredMessage = data.message.replace(/(\r\n|\n|\r)/g, "");
        callback(filteredMessage);
      }
    });
  }

  return {
    signIn,
    signOut,
    register,
    deleteAccount,
    verifyAccount,
    pushChat,
    username,
    isLoggedIn,
    registrationStatus,
    botName,
    s3,
    isFileExplorerEnabled,
    albumBucketName,
    userSub,
    botAlias,
    uploadPath,
    currentUser,
  };
};

export default useCognito;
