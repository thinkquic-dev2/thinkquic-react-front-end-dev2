import React, { useState } from "react";

import SignInForm from "./SignInForm";

const SignInFormContainer = ({ signIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameErrors, setUsernameErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [errorsAfterSubmit, setErrorsAfterSubmit] = useState([]);

  const validateUsername = (username) => {
    if (username === "") {
      setUsernameErrors(["Username must not be empty"]);
    } else {
      setUsernameErrors([]);
    }
  };

  const validatePassword = (password) => {
    if (password === "") {
      setPasswordErrors(["Password must not be empty"]);
    } else {
      setPasswordErrors([]);
    }
  };

  const isUsernameValid = () => {
    if (username !== "" && usernameErrors.length < 1) {
      return true;
    }
    return false;
  };

  const isPasswordValid = () => {
    if (password !== "" && passwordErrors.length < 1) {
      return true;
    }
    return false;
  };

  const signInHandler = (event) => {
    event.preventDefault();
    if (isPasswordValid() && isUsernameValid()) {
      console.log("SignIn form is good to submit");
      signIn(username, password, (error) => {
        setErrorsAfterSubmit([error.message]);
      });
    } else {
      validatePassword(password);
      validateUsername(username);
    }
  };
  return (
    <div>
      <SignInForm
        validatePassword={validatePassword}
        validateUsername={validateUsername}
        passwordErrors={passwordErrors}
        usernameErrors={usernameErrors}
        errorsAfterSubmit={errorsAfterSubmit}
        setErrorsAfterSubmit={setErrorsAfterSubmit}
        setUsername={setUsername}
        setPassword={setPassword}
        password={password}
        username={username}
        signInHandler={signInHandler}
      />
    </div>
  );
};

export default SignInFormContainer;
