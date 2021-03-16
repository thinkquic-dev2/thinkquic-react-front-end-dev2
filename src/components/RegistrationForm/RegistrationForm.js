import React from "react";
import { Link } from "react-router-dom";
const RegistrationForm = ({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  passwordConfirmation,
  setPasswordConfirmation,
  registerHandler,
  errors,
  validatePassword,
  passwordErrors,
  passwordConfirmationErrors,
  errorsAfterSubmit,
  setErrorsAfterSubmit,
  emailErrors,
  validateEmail,
  usernameErrors,
  validateUsername,
}) => {
  return (
    <div className="d-flex registration-form-container">
      <form
        onSubmit={(event) => {
          registerHandler(event);
        }}
        className="registration-form form m-auto"
      >
        <div className="registration-form__heading">
          <a href="https://thinkquic.com/" target="_blank">
            <img
              className="registration-form__logo"
              src="https://thinkquic.com/wp-content/uploads/2020/10/thinkquic_logo2.png"
              alt=""
            />
          </a>
        </div>
        {errorsAfterSubmit.length > 0 ? (
          <div>
            <ul>
              {errorsAfterSubmit.map((errorAfterSubmit, index) => (
                <li className="text-danger" key={"error-after-submit" + index}>
                  {errorsAfterSubmit}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(event) => {
              setErrorsAfterSubmit([]);
              validateEmail(event.target.value);
              setEmail(event.target.value);
            }}
          />
        </div>
        {emailErrors.length > 0 ? (
          <div>
            <ul>
              {emailErrors.map((emailError, index) => (
                <li className="text-danger" key={"email-error" + index}>
                  {emailError}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
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
        {usernameErrors.length > 0 ? (
          <div>
            <ul>
              {usernameErrors.map((usernameError, index) => (
                <li className="text-danger" key={"email-error" + index}>
                  {usernameError}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
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
        {passwordErrors.length > 0 ? (
          <div>
            <ul>
              {passwordErrors.map((passwordError, index) => (
                <li className="text-danger" key={"password-error-" + index}>
                  {passwordError}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="form-group">
          <label htmlFor="">Confirm Password</label>
          <input
            className="form-control"
            type="password"
            name="confirm-password"
            id="confirm-password"
            value={passwordConfirmation}
            onChange={(event) => {
              setErrorsAfterSubmit([]);
              setPasswordConfirmation(event.target.value);
            }}
          />
        </div>
        {passwordConfirmationErrors.length > 0 ? (
          <div>
            <ul>
              {passwordConfirmationErrors.map((passwordConfirmationError, index) => (
                <li className="text-danger" key={"password-confirmation-error-" + index}>
                  {passwordConfirmationError}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <button className="btn btn-primary registration-form__register-button" type="submit" id="register">
          Register
        </button>

        <p className="registration-form__sign-in-hint">
          Already have an account? <Link to="/sign-in">Login Here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
