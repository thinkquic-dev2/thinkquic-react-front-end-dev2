import React from "react";

import "./SignInForm.scss";

import { Link } from "react-router-dom";

const SignInForm = ({
  username,
  password,
  setUsername,
  setPassword,
  signInHandler,
  validatePassword,
  validateUsername,
  usernameErrors,
  passwordErrors,
  errorsAfterSubmit,
  setErrorsAfterSubmit,
}) => {
  const errorListItemClass = "text-danger";
  const usernameErrorList =
    usernameErrors.length > 0 ? (
      <div>
        <ul>
          {usernameErrors.map((usernameError, index) => (
            <li className={errorListItemClass} key={"username-error-" + index}>
              {usernameError}
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  const passwordErrorList =
    passwordErrors.length > 0 ? (
      <div>
        <ul>
          {passwordErrors.map((passwordError, index) => (
            <li className={errorListItemClass} key={"password-error-" + index}>
              {passwordError}
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  const afterSubmitErrorList =
    errorsAfterSubmit.length > 0 ? (
      <div>
        <ul>
          {errorsAfterSubmit.map((errorAfterSubmit, index) => (
            <li
              className={errorListItemClass}
              key={"error-after-submit-" + index}
            >
              {errorAfterSubmit}
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  return (
    <div className="d-flex sign-in-form-container" style={{ height: "100vh" }}>
      <form
        onSubmit={(event) => {
          signInHandler(event);
        }}
        className="sign-in-form form m-auto"
      >
        <div className="sign-in-form__heading">
          <img
            className="sign-in-form__logo"
            src="https://thinkquic.com/wp-content/uploads/2020/10/thinkquic_logo2.png"
            alt=""
          />
        </div>
        {afterSubmitErrorList}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="username"
            name="username"
            id="username"
            value={username}
            onChange={(event) => {
              setErrorsAfterSubmit([]);
              validateUsername(event.target.value);
              setUsername(event.target.value);
            }}
          />
        </div>
        {usernameErrorList}
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(event) => {
              setErrorsAfterSubmit([]);
              validatePassword(event.target.value);
              setPassword(event.target.value);
            }}
          />
        </div>
        {passwordErrorList}
        <button
          className="btn btn-primary sign-in-form__sign-in-button"
          type="submit"
          id="sign-in"
        >
          Sign In
        </button>

        <p className="sign-in-form__register-hint">
          Don't have an account yet? <Link to="/register">Register Here</Link>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
