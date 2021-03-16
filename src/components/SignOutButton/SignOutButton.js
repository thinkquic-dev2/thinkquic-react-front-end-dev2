import React from "react";
const SignOutButton = ({ signOutHandler }) => {
  return (
    <button className="btn btn-success" onClick={() => signOutHandler()}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
