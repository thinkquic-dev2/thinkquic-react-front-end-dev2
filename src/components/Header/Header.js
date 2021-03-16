import React, { useState } from "react";

import "./Header.scss";

import { hamburgerIcon } from "../../Icons/Icons";

const Header = ({ children, theme }) => {
  const [collapsed, setCollapsed] = useState(true);
  const menuToggleClick = () => {
    setCollapsed(!collapsed);
  };

  const collapseClass = collapsed ? "header__collapse" : "header__collapse header__collapse--active";
  const logoUrl =
    theme === "theme-two"
      ? process.env.PUBLIC_URL + "/images/thinkquick-logo-attemp-white-01.png"
      : process.env.PUBLIC_URL + "/images/thinkquick-logo-attemp-01.png";

  return (
    <div className="header">
      <div className="header__brand">
        <a href="https://thinkquic.com/" target="_blank">
          <img className="header__brand-logo" src={logoUrl} alt="" />
        </a>
        <span className="header__brand-text sr-only">Thinkquic</span>
      </div>
      <button onClick={menuToggleClick} className="header__menu-toggle">
        {hamburgerIcon}
      </button>
      <div className={collapseClass}>
        <div className="header__user-utilities">{children}</div>
      </div>
    </div>
  );
};

export default Header;
