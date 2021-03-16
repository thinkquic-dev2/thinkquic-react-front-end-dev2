import React from "react";

import "./RightSidebar.scss";

import { closeIcon } from "../../Icons/Icons";

const RightSidebar = ({ isRightSidebarOpen, closeRightSidebar, rightSidebarContent, isMobile }) => {
  let rightSidebarClasses = isRightSidebarOpen ? "right-sidebar right-sidebar--active" : "right-sidebar";
  rightSidebarClasses = isMobile ? rightSidebarClasses + " right-sidebar--is-mobile" : rightSidebarClasses;

  return (
    <div className={rightSidebarClasses}>
      <button onClick={closeRightSidebar} className="right-sidebar__close">
        {closeIcon}
      </button>
      <div className="right-sidebar__content">{rightSidebarContent}</div>
    </div>
  );
};

export default RightSidebar;
