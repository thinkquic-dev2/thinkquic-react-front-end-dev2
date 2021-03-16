import React, { useContext, useEffect } from "react";

import "./App.scss";

import { AppContext } from "./AppContext";

import SignInFormContainer from "./components/SignInForm/SignInFormContainer";
import RegistrationFormContainer from "./components/RegistrationForm/RegistrationFormContainer";
import ForgotPasswordFormContainer from "./components/ForgotPasswordForm/ForgotPasswordFormContainer";
import ChatApp from "./components/ChatApp/ChatApp";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { API } from "aws-amplify";
import { createUser } from "./graphql/mutations";

function App() {
  const {
    signIn,
    register,
    verifyAccount,
    registrationStatus,
    isLoggedIn,
    username,
    getLoginAttempts,
    incrementLoginAttempts,
    resetLoginAttempts,
    userSub,
    joinedDate,
    setJoinedDate,
  } = useContext(AppContext);

  useEffect(() => {
    const getToken = async () => {
      const newuser = localStorage.getItem("usernew");
      if (registrationStatus === "verified" && isLoggedIn) {
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
        variables: { ...user, joined_at: Math.floor(Date.now() / 1000) },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Router>
      <Route
        exact
        path="/"
        render={() => {
          if (isLoggedIn && username) {
            return <ChatApp />;
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
          return (
            <SignInFormContainer
              signIn={signIn}
              getLoginAttempts={getLoginAttempts}
              incrementLoginAttempts={incrementLoginAttempts}
              resetLoginAttempts={resetLoginAttempts}
            />
          );
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
        path="/forgot-password"
        render={() => {
          if (isLoggedIn && username) {
            return <Redirect to="/" />;
          }
          return <ForgotPasswordFormContainer />;
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
}

export default App;
