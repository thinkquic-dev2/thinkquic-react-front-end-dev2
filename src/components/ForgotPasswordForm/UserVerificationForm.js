import React from "react";

const UserVerificationForm = () => {
  return (
    <div>
      <form>
        We've sent you a verification code in your email. Please enter the code below
        <label htmlFor="verification-code"></label>
        <input type="text" />
      </form>
    </div>
  );
};

export default UserVerificationForm;
