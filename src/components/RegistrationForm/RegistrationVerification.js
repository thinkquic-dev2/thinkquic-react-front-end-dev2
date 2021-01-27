import React from "react";

import "./RegistrationVerification.scss";

const RegistrationVerification = ({
  verificationCode,
  setVerificationCode,
  sendVerificationHandler,
}) => {
  return (
    <div className="d-flex w-100 registration-verification-container">
      <form
        className="registration-verification"
        onSubmit={sendVerificationHandler}
      >
        <p className="registration-verification__hint">
          We've sent you a verification code in your email. Please enter the
          code below
        </p>
        <div className="form-group">
          <label htmlFor="verification-code">Verification Code</label>
          <input
            placeholder="ex.000000"
            name="verification-code"
            id="verification-code"
            className="form-control"
            value={verificationCode}
            onChange={(event) => {
              setVerificationCode(event.target.value);
            }}
            type="text"
          />
        </div>
        <button className="btn btn-primary registration-verification__verify-button">
          Verify
        </button>
      </form>
    </div>
  );
};

export default RegistrationVerification;
