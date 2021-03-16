import React from "react";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  return (
    <form action="" className="form forgot-password-form">
      <div className="sign-in-form__heading">
        <a href="https://thinkquic.com/" target="_blank">
          <img
            className="sign-in-form__logo"
            src="https://thinkquic.com/wp-content/uploads/2020/10/thinkquic_logo2.png"
            alt=""
          />
        </a>
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input className="form-control" type="username" name="username" id="username" />
      </div>
      <p>
        <Link to="/sign-in">Back to sign in</Link>
      </p>
      <p>
        <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
