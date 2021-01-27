import React, { useState } from "react";

import "./Header.scss";

import Dropdown from "./Dropdown/Dropdown";

const Header = ({
  username,
  signOutButton,
  myProfileButton,
  settingsButton,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const menuToggleClick = () => {
    setCollapsed(!collapsed);
  };
  const collapseClass = collapsed
    ? "header__collapse"
    : "header__collapse header__collapse--active";

  return (
    <div className="header">
      <div className="header__brand">
        <img
          className="header__brand-logo"
          src="https://thinkquic.com/wp-content/uploads/2020/09/thinkquiclogo_Only-300x267.png"
          alt=""
        />
        <span className="header__brand-text">Thinkquic</span>
      </div>
      <button onClick={menuToggleClick} className="header__menu-toggle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>
      <div className={collapseClass}>
        <div className="header__user-utilities">
          <div className="header__item">{username}</div>
          <div className="header__item ml-md-3">
            <Dropdown
              toggle={
                <button className="dropdown__toggle btn btn-secondary">
                  <span>Account</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>
              }
            >
              {myProfileButton}
              {settingsButton}
              {signOutButton}
            </Dropdown>
            {/* <button className="btn btn-outline-secondary">Account</button>
            <div className="d-none">
              <div className="ml-md-3">{signOutButton}</div>
              <div className="ml-md-3">Profile</div>
              <div className="ml-md-3">Settings</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
