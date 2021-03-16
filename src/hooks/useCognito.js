import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk";
import { useEffect, useState } from "react";

import useConfig from "./useConfig";

const useCognito = () => {
  const appConfig = useConfig();
  const poolData = { UserPoolId: appConfig.cognito.UserPoolId, ClientId: appConfig.cognito.ClientId };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const [currentUser, setCurrentUser] = useState(null);
  const [userSub, setUserSub] = useState("");

  const [cognitoUser, setCognitoUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState("not started");

  const signIn = (username, password, errorCallback) => {
    setUsername(username);

    var authenticationData = {
      Username: username,
      Password: password,
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    let cognitoUser = getCognitoUser(username, userPool);

    //console.log(getCognitoUser);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();

        //POTENTIAL: Region needs to be set if not already set previously elsewhere.
        AWS.config.region = appConfig.cognito.region;

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: appConfig.cognito.identityPoolId, // your identity pool id here
          Logins: {
            // Change the key below according to the specific region your user pool is in.
            ["cognito-idp." +
            appConfig.cognito.region +
            ".amazonaws.com/" +
            appConfig.cognito.UserPoolId]: result.getIdToken().getJwtToken(),
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
            setCognitoUser(cognitoUser);
            setIsLoggedIn(true);
            setCurrentUser(cognitoUser);
            setUsername(cognitoUser.username);
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
    getCognitoUser(username, userPool).signOut();
    setCognitoUser(null);
    setCurrentUser(null);
    setIsLoggedIn(false);
    setUsername(null);
    setRegistrationStatus("not started");
  };

  const getCurrentLoggedInSession = () => {
    let cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          console.log(err.message);
        } else {
          const idToken = session.getIdToken().getJwtToken();
          setEmail(session.getIdToken().payload.email);
          getCognitoIdentityCredentials(cognitoUser, idToken);
          setCognitoUser(cognitoUser);
        }
      });
    } else {
      console.log("Session expired. Please log in again.");
    }
  };

  function getCognitoIdentityCredentials(cognitoUser, idToken) {
    AWS.config.region = appConfig.cognito.region;

    var loginMap = getLoginMap(appConfig.cognito.region, appConfig.cognito.UserPoolId, idToken);

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: appConfig.cognito.identityPoolId,
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

  function register(email, username, password, passwordConfirmation, errorCallback) {
    setUsername(username);
    var attributeList = [];

    var dataEmail = {
      Name: "email",
      Value: email,
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp(username, password, attributeList, null, function (err, result) {
      if (err) {
        console.log(err.message);
        errorCallback(err);
      } else {
        setCognitoUser(result.user);
        setUserSub(result.userSub);
        setRegistrationStatus("verifying");
      }
    });
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
    getCognitoUser(username, userPool).confirmRegistration(verificationCode, true, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        localStorage.setItem("usernew", cognitoUser.username);
        setRegistrationStatus("verified");
      }
    });
  }

  function resetPassword(username, callback) {
    // setup cognitoUser first
    let cognitoUser = getCognitoUser(username, userPool);

    // call forgotPassword on cognitoUser
    cognitoUser.forgotPassword({
      onSuccess: function (result) {
        console.log(result);
        callback(null);
      },
      onFailure: function (err) {
        callback(err);
      },
    });
  }

  function confirmPassword(username, verificationCode, newPassword, callback) {
    let cognitoUser = getCognitoUser(username, userPool);

    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onFailure(err) {
        callback(err);
      },
      onSuccess() {
        callback(null);
      },
    });
  }

  const getCognitoUser = (username, userPool) => {
    const userData = {
      Username: username,
      Pool: userPool,
    };
    return new AmazonCognitoIdentity.CognitoUser(userData);
  };

  const getLoginMap = (region, userPoolId, idToken) => {
    let loginMap = {};
    loginMap["cognito-idp." + region + ".amazonaws.com/" + userPoolId] = idToken;
    return loginMap;
  };

  // Determine if user is logged in
  useEffect(() => {
    getCurrentLoggedInSession();
    // eslint-disable-next-line
  }, []);

  return {
    signIn,
    signOut,
    register,
    deleteAccount,
    verifyAccount,
    resetPassword,
    confirmPassword,
    username,
    email,
    isLoggedIn,
    registrationStatus,
    currentUser,
    userSub,
  };
};

export default useCognito;
