import React, { useState } from "react";

import "./Dropdown.scss";

const Dropdown = (props) => {
  const { children, toggle } = props;
  const [isActive, setIsActive] = useState(false);
  const dropdownItemsClass = isActive
    ? "dropdown__items dropdown__items--active"
    : "dropdown__items";
  const dropdownClass = isActive ? "dropdown dropdown--active" : "dropdown";
  return (
    <div className={dropdownClass}>
      <div onClick={() => setIsActive(!isActive)}>{toggle}</div>
      <div className={dropdownItemsClass}>{children}</div>
    </div>
  );
};

export default Dropdown;
