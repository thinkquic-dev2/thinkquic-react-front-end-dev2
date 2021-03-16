import React, { useState } from "react";

import "./Dropdown.scss";

const Dropdown = ({ children, isActive, setIsActive, toggle }) => {
  const dropdownItemsClass = isActive ? "dropdown__items dropdown__items--active" : "dropdown__items";
  const dropdownClass = isActive ? "dropdown dropdown--active" : "dropdown";
  return (
    <div className={dropdownClass}>
      <div onClick={() => setIsActive(!isActive)}>{toggle}</div>
      <div className={dropdownItemsClass}>{children}</div>
    </div>
  );
};

export default Dropdown;
