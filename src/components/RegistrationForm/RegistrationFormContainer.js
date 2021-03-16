import React, { useState, useEffect } from "react";

import RegistrationForm from "./RegistrationForm";

import RegistrationVerification from "./RegistrationVerification";

import "./RegistrationForm.scss";

import { Redirect } from "react-router-dom";

const RegistrationFormContainer = ({ registrationStatus, register, verifyAccount }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [registrationErrors, setRegistrationErrors] = useState([]);

  // Username should be unique
  // Must have Length greater than or equal to 9
  // Must have uppercase characters
  // Must have numeric characters
  // Must have symbols
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordConfirmationErrors, setPasswordConfirmationErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [errorsAfterSubmit, setErrorsAfterSubmit] = useState(false);
  const [usernameErrors, setUsernameErrors] = useState([]);

  useEffect(() => {
    validatePasswordConfirmation();
    // eslint-disable-next-line
  }, [password, passwordConfirmation]);

  const validateUsername = (username) => {
    if (username === "") {
      setUsernameErrors(["Must not be empty"]);
    } else {
      setUsernameErrors([]);
    }
  };

  const validatePassword = (password) => {
    const isStringAtleastNineChars = (str) => {
      if (str.length >= 9) {
        return true;
      } else {
        return false;
      }
    };
    const containsUppercaseLetter = (str) => {
      for (let i = 0; i < str.length; i++) {
        if (str[i].match(/[A-Z]/)) {
          return true;
        }
      }
      return false;
    };
    const containsNumber = (str) => {
      for (let i = 0; i < str.length; i++) {
        if (str[i].match(/[0-9]/)) {
          return true;
        }
      }
      return false;
    };
    const containsSymbol = (str) => {
      for (let i = 0; i < str.length; i++) {
        if (str[i].match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/)) {
          return true;
        }
      }
      return false;
    };
    let passwordErrors = [];
    if (!isStringAtleastNineChars(password)) {
      passwordErrors.push("Must have length greater than or equal to 9");
    }

    if (!containsUppercaseLetter(password)) {
      passwordErrors.push("Must have uppercase characters");
    }

    if (!containsNumber(password)) {
      passwordErrors.push("Must have numeric characters");
    }

    if (!containsSymbol(password)) {
      passwordErrors.push("Must have symbols");
    }

    setPasswordErrors(passwordErrors);
  };

  const validateEmail = (email) => {
    if (email === "") {
      setEmailErrors(["Must not be empty"]);
    } else {
      setEmailErrors([]);
    }
  };

  const validatePasswordConfirmation = () => {
    let passwordConfirmationErrors = [];
    if (passwordConfirmation !== password) {
      passwordConfirmationErrors.push("Must match password");
    }
    setPasswordConfirmationErrors(passwordConfirmationErrors);
  };

  const registerHandler = (event) => {
    event.preventDefault();
    if (isEmailValid() && isUserNameValid() && isPasswordValid() && isPasswordConfirmationValid()) {
      register(email, username, password, passwordConfirmation, (error) => {
        setErrorsAfterSubmit([error.message]);
      });
    } else {
      validatePassword(password);
      validatePasswordConfirmation();
      validateUsername(username);
      validateEmail(email);
    }

    // if (registerFormValidationErrors().length > 0) {
    //   setRegistrationErrors(registerFormValidationErrors());
    //   return;
    // } else {
    //   register(email, username, password, passwordConfirmation);
    // }
  };

  const isPasswordValid = () => {
    if (password !== "" && passwordErrors.length < 1) {
      return true;
    }
    return false;
  };

  const isPasswordConfirmationValid = () => {
    if (passwordConfirmation !== "" && passwordConfirmationErrors.length < 1) {
      return true;
    }
    return false;
  };

  const isEmailValid = () => {
    if (email !== "") {
      return true;
    }
    return false;
  };

  const isUserNameValid = () => {
    if (username !== "") {
      return true;
    }
    return false;
  };

  const registerFormValidationErrors = () => {
    let errors = [];
    if (email === "") {
      errors.push("Please put a valid email");
    }

    if (username === "") {
      errors.push("Please enter a username");
    }

    if (password === "") {
      errors.push("Please enter a password");
    }

    if (passwordConfirmation === "") {
      errors.push("Please enter a password confirmation");
    }

    return errors;
  };

  const sendVerificationHandler = (event) => {
    event.preventDefault();
    verifyAccount(verificationCode);
  };

  const registrationView = () => {
    if (registrationStatus === "verifying") {
      return (
        <RegistrationVerification
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          sendVerificationHandler={sendVerificationHandler}
        />
      );
    } else if (registrationStatus === "verified") {
      return <Redirect to="/sign-in" />;
    } else {
      return (
        <RegistrationForm
          validatePassword={validatePassword}
          passwordErrors={passwordErrors}
          passwordConfirmationErrors={passwordConfirmationErrors}
          errorsAfterSubmit={errorsAfterSubmit}
          setErrorsAfterSubmit={setErrorsAfterSubmit}
          validateEmail={validateEmail}
          emailErrors={emailErrors}
          validateUsername={validateUsername}
          usernameErrors={usernameErrors}
          errors={registrationErrors}
          email={email}
          setEmail={setEmail}
          username={username}
          setUsername={setUsername}
          passowrd={password}
          setPassword={setPassword}
          passwordConfirmation={passwordConfirmation}
          setPasswordConfirmation={setPasswordConfirmation}
          registerHandler={registerHandler}
        />
      );
    }
  };

  return registrationView();
};

export default RegistrationFormContainer;
