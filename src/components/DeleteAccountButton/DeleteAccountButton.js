import React from "react";

import "./DeleteAccountButton.scss";

const DeleteAccountButton = ({ deleteAccountHandler }) => {
  return (
    <button
      className="btn btn-danger delete-account-button"
      onClick={deleteAccountHandler}
    >
      Delete My Account
    </button>
  );
};

export default DeleteAccountButton;
