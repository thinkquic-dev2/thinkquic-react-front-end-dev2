import React, { useState, useContext } from "react";

import { Link, Redirect } from "react-router-dom";

import "./ChangePassword.scss";

import { AppContext } from "../../AppContext";

import { closeIcon } from "../../Icons/Icons";

const ChangePasswordContainer = ({ closeRightSidebar }) => {
  const { resetPassword, confirmPassword } = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordVerificationCode, setPasswordVerificationCode] = useState("");
  const [isUsernameProvided, setIsUsernameProvided] = useState(false);
  const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(false);

  const [usernameErrorMessages, setUsernameErrorMessages] = useState([]);

  const [formErrorMessages, setFormErrorMessages] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordConfirmationErrors, setPasswordConfirmationErrors] = useState([]);
  const [passwordVerificationCodeErrors, setPasswordVerificationCodeErrors] = useState([]);

  const usernameInputChangeHandler = (inputValue) => {
    setUsername(inputValue);
    const usernameValidationErrors = validateUsername(inputValue);
    if (usernameValidationErrors.length > 0) {
      setUsernameErrorMessages([...usernameValidationErrors]);
    } else {
      setUsernameErrorMessages([]);
    }
  };

  const passwordInputChangeHandler = (passwordInputValue) => {
    setPassword(passwordInputValue);
    const passwordValidationErrors = validatePassword(passwordInputValue);
    if (passwordValidationErrors.length > 0) {
      setPasswordErrors([...passwordValidationErrors]);
    } else {
      setPasswordErrors([]);
    }
  };

  const passwordConfirmationInputChangeHandler = (passwordConfirmationInputValue) => {
    setPasswordConfirmation(passwordConfirmationInputValue);
    const passwordConfirmationValidationErrors = validatePasswordConfirmation(passwordConfirmationInputValue);
    if (passwordConfirmationValidationErrors.length > 0) {
      setPasswordConfirmationErrors([...passwordConfirmationValidationErrors]);
    } else {
      setPasswordConfirmationErrors([]);
    }
  };

  const passwordVerificationCodeInputChangeHandler = (passwordVerificationCodeInputValue) => {
    setPasswordVerificationCode(passwordVerificationCodeInputValue);
    const passwordVerificationCodeValidationErrors = validatePasswordVerificationCode(
      passwordVerificationCodeInputValue
    );
    if (passwordVerificationCodeValidationErrors.length > 0) {
      setPasswordVerificationCodeErrors([...passwordVerificationCodeValidationErrors]);
    } else {
      setPasswordVerificationCodeErrors([]);
    }
  };

  const validateUsername = (username) => {
    const usernameValidationErrors = [];
    if (username === "") {
      usernameValidationErrors.push("Username must not be empty.");
    }
    return usernameValidationErrors;
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

    return passwordErrors;
  };

  const validatePasswordConfirmation = (passwordConfirmation) => {
    const passwordConfirmationErrors = [];
    if (password !== passwordConfirmation) {
      passwordConfirmationErrors.push("Passwords must match.");
    }

    return passwordConfirmationErrors;
  };

  const validatePasswordVerificationCode = (verificationCode) => {
    const verificationCodeErrors = [];
    if (verificationCode === "") {
      verificationCodeErrors.push("Verification code must not be empty");
    }
    return verificationCodeErrors;
  };

  const sendVerificationClickHandler = () => {
    const validationErrors = validateUsername(username);
    if (validationErrors.length > 0) {
      setUsernameErrorMessages([...validationErrors]);
      return;
    }
    resetPassword(username, (error) => {
      if (error) {
        console.log(error);
        setFormErrorMessages([error.message]);
      } else {
        setIsUsernameProvided(true);
      }
    });
  };

  const resetPasswordClickHandler = () => {
    const passwordValidationErrors = validatePassword(password);
    const passwordConfirmationValidationErrors = validatePasswordConfirmation(passwordConfirmation);
    const passwordVerificationCodeValidationErrors = validatePasswordVerificationCode(passwordVerificationCode);
    const resetPasswordErrors = [
      ...passwordValidationErrors,
      ...passwordConfirmationValidationErrors,
      ...passwordVerificationCodeValidationErrors,
    ];
    setPasswordErrors(passwordValidationErrors);
    setPasswordConfirmationErrors(passwordConfirmationValidationErrors);
    setPasswordVerificationCodeErrors(passwordVerificationCodeValidationErrors);

    if (resetPasswordErrors.length < 1) {
      confirmPassword(username, passwordVerificationCode, password, (error) => {
        if (error) {
          console.log(error);
          setFormErrorMessages([error.message]);
        } else {
          setIsPasswordResetSuccess(true);
          closeRightSidebar();
        }
      });
    }
  };

  const getUsernameErrorMessageList = () => {
    if (usernameErrorMessages.length < 1) {
      return null;
    }
    return (
      <ul>
        {usernameErrorMessages.map((errorMessage, index) => (
          <li className="text-danger" key={"username-error-" + index}>
            {errorMessage}
          </li>
        ))}
      </ul>
    );
  };

  const getFormErrorMessageList = () => {
    if (formErrorMessages.length < 1) {
      return null;
    }
    return (
      <ul>
        {formErrorMessages.map((errorMessage, index) => (
          <li className="text-danger" key={"username-error-" + index}>
            {errorMessage}
          </li>
        ))}
      </ul>
    );
  };

  const getPasswordErrorMessageList = () => {
    if (passwordErrors.length < 1) {
      return null;
    }
    return (
      <ul>
        {passwordErrors.map((errorMessage, index) => (
          <li className="text-danger" key={"username-error-" + index}>
            {errorMessage}
          </li>
        ))}
      </ul>
    );
  };

  const getPasswordConfirmationErrorMessageList = () => {
    if (passwordConfirmationErrors.length < 1) {
      return null;
    }
    return (
      <ul>
        {passwordConfirmationErrors.map((errorMessage, index) => (
          <li className="text-danger" key={"password-confirmation-error-" + index}>
            {errorMessage}
          </li>
        ))}
      </ul>
    );
  };

  const getPasswordVerificationCodeErrorMessageList = () => {
    if (passwordVerificationCodeErrors.length < 1) {
      return null;
    }
    return (
      <ul>
        {passwordVerificationCodeErrors.map((errorMessage, index) => (
          <li className="text-danger" key={"password-verification-code-error-" + index}>
            {errorMessage}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="change-password-container">
      <form className="form change-password-form">
        <div className="text-center font-weight-bold">Change Password</div>
        {getFormErrorMessageList()}
        {!isUsernameProvided ? (
          <>
            <div className="form-group mt-3">
              <label htmlFor="">Please enter your username</label>
              <input
                className="form-control"
                type="text"
                value={username}
                onChange={(event) => usernameInputChangeHandler(event.target.value)}
              />
              {getUsernameErrorMessageList()}
            </div>
            <button type="button" className="btn btn-primary btn-block my-3" onClick={sendVerificationClickHandler}>
              Send verification code
            </button>
          </>
        ) : (
          <>
            <div className="form-group mt-3">
              <label htmlFor="">Verification Code</label>
              <input
                type="text"
                className="form-control"
                value={passwordVerificationCode}
                onChange={(event) => passwordVerificationCodeInputChangeHandler(event.target.value)}
              />
              {getPasswordVerificationCodeErrorMessageList()}
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => passwordInputChangeHandler(event.target.value)}
              />
              {getPasswordErrorMessageList()}
            </div>

            <div className="form-group">
              <label htmlFor="">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                value={passwordConfirmation}
                onChange={(event) => passwordConfirmationInputChangeHandler(event.target.value)}
              />
              {getPasswordConfirmationErrorMessageList()}
            </div>

            <button className="btn btn-block btn-primary my-3" type="button" onClick={resetPasswordClickHandler}>
              Reset Password
            </button>
          </>
        )}
      </form>

      {/* <ForgotPasswordForm />
      <UserVerificationForm /> */}
    </div>
  );
};

export default ChangePasswordContainer;
